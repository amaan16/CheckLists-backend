const express = require("express");
const database = require('./database');

async function findUser(user){
    console.log("Checking DB for the User");
    const query = {
        userName: user.userName,
        password: user.password
    }
    try{
        const user = await database.usersCollection.findOne(query,{ projection: { _id: 0 } });
        if(user){
            return user;
        }else{
            throw new Error("User not found");
        }}
    
    catch(err){
        console.error("User not found");
        throw err;
    }
}

module.exports = {findUser}
