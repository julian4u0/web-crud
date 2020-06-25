const User = require("../Controllers/UserController")
const Task = require("../Controllers/TaskController")
const express = require("express")

const router = express.Router();

// Usuario
router.post('/register', User.createUser);
router.post('/login', User.loginUser);

// Tareas
router.post('/createTask', Task.createTask);
router.post('/myTasks', Task.queryTasks);
router.post('/deleteTask', Task.deleteTask);

module.exports = router;