const express = require("express");
const cors = require("cors");
// const path = require("path");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/todos", {
  useNewUrlParser: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established succesfully");
});

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

app.post("/create", (req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

app.post("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (!todo) {
      res.status(404).send("Todo not found");
    } else {
      todo.text = req.body.text;
      todo.isComplete = req.body.isComplete;
      todo
        .save()
        .then((todo) => {
          res.json(todo);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

app.delete("/:id", async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.send(deletedTodo);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
