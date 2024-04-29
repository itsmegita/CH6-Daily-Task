import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/todos", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/todos.json");
    const todos = JSON.parse(fileContent);
    res.status(200).json({ todos });
  } catch (error) {
    console.error("Error reading todos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const fileContent = await fs.readFile("./data/todos.json");
    const todos = JSON.parse(fileContent);
    const newTodo = { id: todos.length + 1, title };
    todos.push(newTodo);
    await fs.writeFile("./data/todos.json", JSON.stringify(todos, null, 2));
    res.status(201).json({ newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const fileContent = await fs.readFile("./data/todos.json");
    let todos = JSON.parse(fileContent);
    todos = todos.filter((todo) => todo.id !== parseInt(id));
    await fs.writeFile("./data/todos.json", JSON.stringify(todos, null, 2));
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
