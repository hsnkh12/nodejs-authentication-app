const express = require('express');
const router = express.Router();
const User = require('../models/user')
const {PasswordManager} = require('../utils/password')
const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


router.post('/login', async (req, res) => {
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
})


router.post('/register', async (req, res) => {
    let body = req.body

    try{

        let date = new Date()
        date = date.toISOString().slice(0,10)
        
        let user = new User(
            firstName= body.first_name,
            lastName= body.last_name,
            email= body.email,
            password= body.password,
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
})


module.exports = {
    authRoutes: router
}