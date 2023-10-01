const express = require("express");
const router = express.Router();
const {v4 : uuidv4} = require('uuid');
const userController = require('../controllers/userController');

class User {
    constructor(userName,userId,userEmail,password) {
        this.userName = userName;
        this.userId = userId;
        this.userEmail = userEmail;
        this.password = password;
    }
};

router.post('/add',userController.addUser)

router.post('/auth',userController.authenticateUser)

router.post('/edit',userController.editUser)



module.exports = router;