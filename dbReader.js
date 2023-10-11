const express = require("express");
const database = require('./database');

function findUser(filter){
    return database.usersCollection.findOne(filter,{ projection: { _id: 0 } });
}

function findTodos(filter){
    return database.todosCollection.findOne(filter,{ projection: { _id: 0 } });
}

module.exports = {findUser, findTodos}
