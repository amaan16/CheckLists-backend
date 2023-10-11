const express = require("express");
const dbReader = require('../dbReader.js');
const dbWriter = require('../dbWriter.js');
const {v4 : uuidv4} = require('uuid');
const todosController = require("./todosController")

class User{
    constructor(userName, password, email){
        this.userName = userName;
        this.userId = uuidv4();
        this.password = password;
        this.email = email;
    }
}

class AuthReq{
    constructor(userName, password){
        this.userName = userName;
        this.password = password;
    }
}

async function addUser(req,res){
    const user = new User(req.body.userName, req.body.password, req.body.email);
    console.log("new User: ",user);
    try{
        const initialTodos = new todosController.TodosOfUser(user.userName,user.userId,[]);

        await dbWriter.insertUser(user);

        await dbWriter.initialUserTodo(initialTodos);
        res.status(200).json({message : "User added Successfully", initialTodos});
    }catch(err){
        res.status(500).json({message: "Error inserting user"});
    }
}

async function authenticateUser(req,res){
    const userReq = req.body;
    const authReq = new AuthReq(userReq.userName,userReq.password);
    console.log("User trying to log in, User:",userReq);
    const filter = {
        userName: userReq.userName,
        password: userReq.password
    }
    
    try{
        const user = await dbReader.findUser(filter);
        const filter2 = { userId: user.userId };
        const todos = await dbReader.findTodos(filter2);
        res.status(201).json({message : "User found Successfully",todos});
    }catch(err){
        res.status(501).json({message: "Error finding user"});
    }
}

function editUser(req,res){

}

module.exports = {addUser,authenticateUser,editUser}
