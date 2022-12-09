const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const User = require('../models/user')
const { PasswordManager } = require('../utils/authentication')


const registerController = async (req, res) => {
    let body = req.body

    try{

        const hashedPassword = await PasswordManager.hashPassword(body.password)
        let date = new Date()
        date = date.toISOString().slice(0,10)
        
        let user = new User(
            firstName= body.first_name,
            lastName= body.last_name,
            email= body.email,
            password= hashedPassword,
            isAdmin = false,
            isStaff = false,
            isActive= true,
            dateJoined = date,
            lastLogin = date,
        )

        await user.saveUser()
        
        jwt.sign({user}, JWT_SECRET_KEY, {expiresIn: '10m'}, (err, token)=>{
            return res.json({
                token
            });
        })

    }
    catch(error){
        console.log(error)
        return res.sendStatus(403)
    }
}

const loginController = async (req, res) => {    

}

const logoutController = async (req, res) => {

}

const listFileController = async (req, res) => {

}

const createFileController = async (req, res) => {

}

const retrieveFileController = async (req, res) =>{

}

const updateFileController = async (req, res) =>{

}

const deleteFileController = async (req, res) =>{

}


module.exports = {
    registerController,
    loginController,
    logoutController,
    listFileController,
    createFileController,
    retrieveFileController,
    updateFileController,
    deleteFileController
}