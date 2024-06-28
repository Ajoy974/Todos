const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/authorized");
// const User = require("./models/Users");
const Task = require("./models/Tasks");
const ImportentTask = require("./models/Importent");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/Users");
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your actual secret key

const app = express();
app.use(cookie());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/TodoUser");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

// // User registration route
// app.post("/userData", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const user = new User({ username, email, password });
//     await user.save();
//     res.send("User created successfully");
//   } catch (error) {
//     res.status(500).send("Error creating user");
//   }
// });

// Static files
app.use(express.static("public"));
app.set("view engine", "ejs");

// Use the authorized routes
app.use(router);

// Routes
app.get("/", authmiddleware, async (req, res) => {
  try {
    // Find the authenticated user and populate their tasks
    const findUser = await User.findById(req.user).populate("tasks");

    if (!findUser) {
      return res.status(404).send("User not found");
    }

    // Render the tasks belonging to the authenticated user
    const tasks = findUser.tasks;
    const uncompletedTaskCount = tasks.filter((task) => !task.completed).length;
    const completedTaskCount = tasks.filter((task) => task.completed).length;
    const completedTask = tasks.filter((task) => task.completed);
    const uncompletedTask = tasks.filter((task) => !task.completed);
    console.log(uncompletedTaskCount);
    res.render("index", {
      tasks,
      findUser,
      uncompletedTaskCount,
      completedTask,
      uncompletedTask,
      completedTaskCount,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Error fetching tasks");
  }
});

app.get("/deleteTasks/:tasks", authmiddleware, async (req, res) => {
  const id = req.params.tasks; // Correctly access the _id parameter

  try {
    const deletedTask = await Task.findByIdAndDelete({ _id: id }); // Pass the _id directly

    if (!deletedTask) {
      return res.status(404).send("Task not found"); // Handle case where task is not found
    }

    console.log("Deleted task:", deletedTask);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Error deleting task"); // Handle errors
  }
});

app.get("/checkTasks/:id", authmiddleware, async (req, res) => {
  const id = req.params.id; // Correctly access the id parameter

  try {
    // Find the task by id
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send("Task not found"); // Handle case where task is not found
    }

    // Toggle the completed status
    task.completed = !task.completed;

    // Save the updated task
    await task.save();

    res.redirect("/");
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Error updating task"); // Handle errors
  }
});

function authmiddleware(req, res, next) {
  const token = req.cookies["data"];
  if (!token) {
    res.redirect("/signin");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
}

app.get("/signup", (req, res) => {
  res.render("sign-up");
});
app.get("/signin", (req, res) => {
  res.render("sign-in");
});

app.post("/tasks/:userId", authmiddleware, async (req, res) => {
  const { userId } = req.params;
  const { description } = req.body;

  try {
    // Create a new task
    const newTask = new Task({
      description,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Find the user by ID and add the task to the tasks array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: savedTask._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
});

// Importent Tasks
app.post("/importentTasks/:userId", authmiddleware, async (req, res) => {
  const { userId } = req.params;
  const { description } = req.body;

  try {
    // Create a new task
    const newTask = new ImportentTask({
      description,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Find the user by ID and add the task to the tasks array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { importentSchema: savedTask._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
});

// Start the server
app.listen(1000, () => {
  console.log("Server is running on port 1000");
});
