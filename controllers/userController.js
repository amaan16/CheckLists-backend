const express = require("express");
const dbReader = require('../dbReader.js');
const dbWriter = require('../dbWriter.js');

async function addUser(req,res){
    const user = req.body;
    console.log("User: ",user);
    try{
        await dbWriter.insertUser(user);
        res.status(200).json({message : "User added Successfully"});
    }catch(err){
        res.status(500).json({message: "Error inserting user"});
    }
}

async function authenticateUser(req,res){
    const userReq = req.body;
    console.log("User trying to log in, User:",userReq);
    try{
        const user = await dbReader.findUser(userReq);
        res.status(201).json({message : "User found Successfully",user});
    }catch(err){
        res.status(501).json({message: "Error finding user"});
    }
}

function editUser(req,res){

}

module.exports = {addUser,authenticateUser,editUser}
