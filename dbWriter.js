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

function setAllDailyTodosStatusToNo() {
  return database.usersCollection.updateMany(
      { 'todos.nameOfTodo': 'Daily' },
      { $set: { 'todos.$.items.$[].Status': 'No' } }
  );
}

module.exports = { insertUser, initialUserTodo, updateTodo,setAllDailyTodosStatusToNo };
