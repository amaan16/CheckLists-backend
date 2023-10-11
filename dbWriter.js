const express = require("express");
const database = require("./database");

// const db

function insertUser(user) {
  return database.usersCollection.insertOne(user);
}

function initialUserTodo(initialTodos) {
  return database.todosCollection.insertOne(initialTodos);
}

// function pushTodo(filter, update) {
//     return database.todosCollection.updateOne(filter, update);

// }

async function updateTodo(filter, update) {
  return database.todosCollection.updateOne(filter, update);
}

module.exports = { insertUser, initialUserTodo, updateTodo };
