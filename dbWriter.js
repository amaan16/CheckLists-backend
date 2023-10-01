const express = require("express");
const database = require('./database');

// const db

async function insertUser(user){
    try{
        await database.usersCollection.insertOne(user)
    }catch(err){
        console.error("Error insertinf User err: ",err);
        throw err;
    }
}

module.exports = {insertUser};