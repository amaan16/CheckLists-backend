const express = require("express");
const dbReader = require("../dbReader");
const dbWriter = require("../dbWriter");

class TodosOfUser {
  constructor(userName, userId, todos) {
    this.userName = userName;
    this.userId = userId;
    this.todos = todos
      ? todos.map((todo) => new Todo(todo.nameOfTodo, todo.display, todo.items))
      : [];
  }
}

class Todo {
  constructor(nameOfTodo, display, items) {
    this.nameOfTodo = nameOfTodo;
    this.display = display;
    this.items = items.map(
      (itemData) => new Item(itemData.itemName, itemData.status)
    );
  }
}

class Item {
  constructor(itemName, status) {
    this.itemName = itemName;
    this.status = status;
  }
}

async function getTodos (req,res){
  const body = req.body;
  try{
    const filter = {
      userId: body.userId,
    };
    const result = await dbReader.findTodos(filter);
    res.status(200).json({ message: "Todo found Successfully",result });

  }catch(error){
    res.status(501).json({ message: "Error finding Todo" });
  }
}

async function addTodo(req, res) {
  const body = req.body;
  const newTodo = new Todo(body.nameOfTodo, body.display, []);
  try {
    const filter = {
      userId: body.userId,
    };
    const update = { $push: { todos: newTodo } };
    const result = await dbWriter.updateTodo(filter, update);
    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Todo added Successfully" });
    } else {
      res.status(500).json({ message: "Todo insert Failed" });
    }
  } catch (err) {
    res.status(501).json({ message: "Error adding Todo" });
  }
}

async function removeTodo(req, res) {
  const userId = req.body.userId;
  const index = req.body.index;
  try {
    const filter = { userId: userId };
    // await database.todosCollection.findOne(filter);
    const userRecord = await dbReader.findTodos(filter);

    if (!userRecord) {
      console.log("User Todos not Found");
    }

    console.log(userRecord.todos[index]);

    userRecord.todos.splice(index, 1);

    console.log(userRecord);

    const update = {
      $set: { todos: userRecord.todos },
    };

    const result = await dbWriter.updateTodo(filter, update);

    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Todo deleted Successfully" });
    } else {
      res.status(500).json({ message: "Todo delete Failed" });
    }
  } catch (err) {
    res.status(501).json({ message: "Error deleting Todo" });
  }
}

async function editTodo(req, res) {
  const userId = req.body.userId;
  const index = req.body.index;
  const editedTodo = req.body.editedTodo;
  try {
    const filter = { userId: userId };
    // await database.todosCollection.findOne(filter);
    const userRecord = await dbReader.findTodos(filter);

    if (!userRecord) {
      console.log("User Todos not Found");
    }

    console.log(userRecord.todos[index]);

    userRecord.todos[index] = editedTodo;

    console.log(userRecord);

    const update = {
      $set: { todos: userRecord.todos },
    };

    const result = await dbWriter.updateTodo(filter, update);

    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Todo updated Successfully" });
    } else {
      res.status(500).json({ message: "Todo update Failed" });
    }
  } catch (err) {
    res.status(501).json({ message: "Error updating Todo" });
  }
}

async function addTask(req,res){
  const userId = req.body.userId;
  const index = req.body.index;
  try {
    const filter = { userId: userId };
    const update = {
      $push: {
        [`todos.${index}.items`]: {
          itemName: req.body.itemName,
          Status: "No"
        }
      }
    };

    const result = await dbWriter.updateTodo(filter, update);

    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Item Added Successfully" });
    } else {
      res.status(500).json({ message: "Item add Failed" });
    }
  } catch (err) {
    res.status(501).json({ message: "Error adding item" });
  }
}

async function removeTask(req,res){
  const userId = req.body.userId;
  const index = req.body.index;
  const itemName = req.body.itemName;
  try {
    const filter = { userId: userId };
    const update = {
      $pull: {
        [`todos.${index}.items`]: {
          itemName: `${itemName}`,
        },
      },
    };

    const result = await dbWriter.updateTodo(filter, update);

    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Item deleted Successfully" });
    } else {
      res.status(500).json({ message: "Item delete Failed" });
    }
  } catch (err) {
    res.status(501).json({ message: "Error deleting item" });
  }
}

async function updateStatus(req,res){
  const userId = req.body.userId;
  const index = req.body.index;
  const itemIndex = req.body.itemIndex;
  const change = req.body.change;
  console.log("Request: ",req)
  try {
    const filter = { userId: userId };
    const update = {
      $set: {
        [`todos.${index}.items.${itemIndex}.Status`]: change,
      },
    };

    const result = await dbWriter.updateTodo(filter, update);

    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Status updated Successfully" });
    } else {
      res.status(500).json({ message: "Status update Failed" });
    }
  } catch (err) {
    res.status(501).json({ message: "Error updating status" });
  }
}

async function updateVisibility(req,res){
  const userId = req.body.userId;
  const index = req.body.index;
  const change = req.body.change;
  try {
    const filter = { userId: userId };
    const update = {
      $set: {
        [`todos.${index}.display`]: change,
      },
    };

    const result = await dbWriter.updateTodo(filter, update);

    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Visibility updated Successfully" });
    } else {
      res.status(500).json({ message: "Visibility update Failed" });
    }
  } catch (err) {
    res.status(501).json({ message: "Error updating visibility" });
  }
}

module.exports = { TodosOfUser, getTodos, addTodo, removeTodo, addTask, removeTask, editTodo, updateStatus, updateVisibility };
