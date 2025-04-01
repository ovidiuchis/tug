# 🔗 Tiny URL Generator (TUG) = Link Shortener

A simple, stylish, personal URL shortener built with Node.js, Express, and EJS — featuring persistent storage, copy-to-clipboard.

---

## 🌐 Live Demo

👉 Try it live: ---

> Hosted on [Render](https://render.com), free tier.

---

## 🚀 Features

- 🔐 Create short links for long URLs
- 📋 Copy short URLs with one click
- 🧠 Auto-detect and fix missing protocols (`http://`)
- 💾 Persistent storage using `data.json`
- 🎨 Clean UI with custom styles
- 🧩 Custom favicon
- 📡 Ready for deployment (Render, Railway, etc.)

---

## 💻 Tech Stack

- Node.js
- Express
- EJS templating
- HTML/CSS
- `fs` for local JSON storage

---

## 🚧 Project Structure

📁 project-root/
├── server.js
├── data.json
├── package.json
├── views/
│ └── index.ejs
├── public/
│ ├── style.css # 🌈 Styles moved here
│ └── favicon.png
