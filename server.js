const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 3000;

const DATA_FILE = "data.json";
let urlMap = {};

// Load saved data
if (fs.existsSync(DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DATA_FILE);
    urlMap = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse data.json:", e);
    urlMap = {};
  }
}

// Set view engine to EJS
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Optional: use later for CSS/JS if needed

// GET /
app.get("/", (req, res) => {
  res.render("index", { shortUrl: null, error: null });
});

// POST /shorten
app.post("/shorten", (req, res) => {
  let longUrl = req.body.long_url.trim();

  // Add http:// if missing
  if (!/^https?:\/\//i.test(longUrl)) {
    longUrl = "http://" + longUrl;
  }

  // Validate URL
  try {
    new URL(longUrl);
  } catch (e) {
    return res.render("index", {
      shortUrl: null,
      error: "❌ Invalid URL submitted",
    });
  }

  // Reuse existing short code if already shortened
  const existingCode = Object.keys(urlMap).find(
    (code) => urlMap[code] === longUrl
  );
  const code = existingCode || generateCode();
  urlMap[code] = longUrl;

  // Save to JSON file
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(urlMap, null, 2));
    console.log(`Saved: ${code} → ${longUrl}`);
  } catch (err) {
    console.error("Failed to write to file:", err);
  }

  const shortUrl = `${req.protocol}://${req.get("host")}/${code}`;
  res.render("index", { shortUrl, error: null });
});

// GET /:code (redirect)
app.get("/:code", (req, res) => {
  const longUrl = urlMap[req.params.code];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found 😢");
  }
});

// Short code generator
function generateCode(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
