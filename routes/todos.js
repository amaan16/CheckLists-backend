const express = require("express");
const router = express.Router();
// const userController = require('..controllers/todosController');

class TodosOfUser{
    constructor(userName,userId,todos){
        this.userName = userName;
        this.userId = userId;
        this.todo = todos ? todos.map((todo)=> new Todo (todo.nameOfTodo,todo.display,todo.items)) : [];
    }
}

class Todo{
    constructor(nameOfTodo, display, items){
        this.nameOfTodo = nameOfTodo;
        this.display = display;
        this.items = items.map((itemData)=> new Item(itemData.itemName,itemData.status));
    }
}

class Item{
    constructor(itemName,status){
        this.itemName = itemName;
        this.status =status;
    }
}

// router.post('' , (req,res)=> {
//     console.log("Users")
// } );



module.exports = router;