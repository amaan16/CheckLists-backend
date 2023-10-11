const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");

router.post("/get", todosController.getTodos);

router.post("/add", todosController.addTodo);

router.post("/remove", todosController.removeTodo);

router.post("/edit", todosController.editTodo);

router.post("/add-task", todosController.addTask);

router.post("/remove-task", todosController.removeTask);

router.post("/update-status", todosController.updateStatus);

router.post("/update-visibility", todosController.updateVisibility);



module.exports = router;
