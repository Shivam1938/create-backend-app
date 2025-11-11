# 🚀 create-shivam-backend

A simple CLI tool to quickly scaffold a ready-to-use **Express + MongoDB backend project** with basic folder structure and environment setup.

## 📦 Installation

You can use **npx** (recommended) — no global install needed:

```bash
npx create-shivam-backend my-app
```

Or install globally:

```bash
npm install -g create-shivam-backend
create-shivam-backend my-app
```

## 🧱 What It Does

Automatically creates a backend project with:

```
my-app/
 ┣ 📂 config/
 ┃ ┗ db.js
 ┣ 📂 controllers/
 ┣ 📂 models/
 ┣ 📂 routes/
 ┣ 📂 utils/
 ┣ 📄 .env
 ┣ 📄 app.js
 ┣ 📄 index.js
 ┗ 📄 package.json
```

✅ Sets up a basic Express server  
✅ Adds MongoDB connection (`mongoose`)  
✅ Generates `.env` with PORT & MONGO_URI  
✅ Adds start and dev scripts using nodemon  

## ⚙️ Usage

After creating your project:

```bash
cd my-app
npm install
npm run dev
```

Then open: [http://localhost:5000](http://localhost:5000)

## 🧰 Tech Stack

- Node.js  
- Express  
- Mongoose  
- Dotenv  
- Nodemon  

## 🧑‍💻 Example Output

```
📁 Created project folder: my-app
✅ Project files created successfully!

Next steps:
  cd my-app
  npm install
  npm run dev
```

## 📝 License

MIT License © 2025 Shivam Mishra

## ⭐ Support

If you like this package, give it a **star** on npm or GitHub!  
It helps me stay motivated to build more developer tools 🚀
