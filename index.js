#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";

// get project name or '.'
const inputName = process.argv[2] || ".";

// Handle "." (current directory)
const projectName = inputName === "." ? path.basename(process.cwd()) : inputName;
const projectPath = inputName === "." ? process.cwd() : path.join(process.cwd(), projectName);

// Check if folder exists (skip if current dir)
if (inputName !== "." && fs.existsSync(projectPath)) {
  console.log(chalk.red("❌ Folder already exists!"));
  process.exit(1);
}

// Create project folder if not '.'
if (inputName !== ".") {
  fs.mkdirSync(projectPath);
  console.log(chalk.green(`📁 Created project folder: ${projectName}`));
} else {
  console.log(chalk.green(`📂 Using current folder: ${projectPath}`));
}

// Create subfolders
const folders = ["config", "controllers", "models", "routes", "utils"];
folders.forEach(folder => {
  const folderPath = path.join(projectPath, folder);
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
});

// .env
fs.writeFileSync(
  path.join(projectPath, ".env"),
  `PORT=5000\nMONGO_URI=mongodb://localhost:27017/${projectName}\n`
);

// package.json
fs.writeFileSync(
  path.join(projectPath, "package.json"),
  JSON.stringify(
    {
      name: projectName,
      version: "1.0.0",
      main: "index.js",
      type: "module",
      scripts: {
        start: "node index.js",
        dev: "nodemon index.js"
      },
      dependencies: {
        express: "^4.18.2",
        mongoose: "^8.0.0",
        dotenv: "^16.3.1"
      },
      devDependencies: {
        nodemon: "^3.0.1"
      }
    },
    null,
    2
  )
);

// app.js
fs.writeFileSync(
  path.join(projectPath, "app.js"),
  `
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

export default app;
`
);

// config/db.js
fs.writeFileSync(
  path.join(projectPath, "config", "db.js"),
  `
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(\`✅ MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
`
);

// index.js (server setup)
fs.writeFileSync(
  path.join(projectPath, "index.js"),
  `
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`🚀 Server running on port \${PORT}\`));
`
);

console.log(chalk.green("✅ Project files created successfully!"));
console.log(chalk.yellow(`
Next steps:
  ${inputName !== "." ? `cd ${projectName}\n` : ""}
  npm install
  npm run dev
`));
