const express = require("express");
const router = express.Router();
const {v4 : uuidv4} = require('uuid');
// const userController = require('..controllers/userController');

class User {
    constructor(userName,userId,userEmail) {
        this.userName = userName;
        this.userId = userId;
        this.userEmail = userEmail;
    }
};

router.post('/add' , (req,res)=> {
    const body = req.body;
    console.log(req.body);
    const userId = uuidv4();
    console.log("UserId: ",userId);
    const user = new User(body.userName,userId,body.userEmail);

    // res.json(user);
} );



module.exports = router;