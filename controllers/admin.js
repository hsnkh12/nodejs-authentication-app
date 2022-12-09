const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const User = require('../models/user');
const { PasswordManager } = require('../utils/authentication');


const loginController = async (req, res) =>{

    let body = req.body

    try{
        let user = await User.getUserByEmail(body.email)
        user = user[0][0]
        
        const passwordIsValid = await PasswordManager.comparePassword(body.password, user.password)

        if(passwordIsValid){
            jwt.sign({user}, JWT_SECRET_KEY, {expiresIn: '10m'}, (err, token)=>{
                return res.json({
                    token
                });
            })
        }
        else{
            return res.sendStatus(401);
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(401);
    }

}

const logoutController = async (req, res) => {

}

const listFileController = async (req, res) =>{

}

const createFileController = async (req, res) =>{

}

const retrieveFileController = async (req, res) =>{

}

const updateFileController = async (req, res) =>{

}

const deleteFileController = async (req, res) =>{

}

const listUserController = async (req, res) =>{

}

const createUserController = async (req, res) =>{

}

const retrieveUserController = async (req, res) =>{

}

const updateUserController = async (req, res) =>{

}

const deleteUserController = async (req, res) =>{

}

const listPermissionController = async (req, res) =>{

}

const createPermissionController = async (req, res) =>{

}

const deletePermissionController = async (req, res) =>{

}

module.exports = {
    loginController,
    logoutController,
    listFileController,
    createFileController,
    retrieveFileController,
    updateFileController,
    deleteFileController,
    listUserController,
    createUserController,
    retrieveUserController,
    updateUserController,
    deleteUserController,
    listPermissionController,
    createPermissionController,
    deletePermissionController
}