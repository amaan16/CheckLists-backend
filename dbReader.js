const express = require("express");
const database = require('./database');

function findUser(filter){
    return database.usersCollection.findOne(filter,{ projection: { _id: 0 } });
}

function findTodos(filter){
    return database.todosCollection.findOne(filter,{ projection: { _id: 0 } });
}

function getUncompletedDailyTodos() {
    const result = database.todosCollection.find(
        { "todos.nameOfTodo": "Daily" },
        { "userName": 1, "userId": 1, "todos.$": 1 }
      ).toArray();
    return result;
}

module.exports = {findUser, findTodos, getUncompletedDailyTodos}
