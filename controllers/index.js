const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const User = require('../models/user')
const { PasswordManager } = require('../utils/password')



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
    loginController,
    logoutController,
    listFileController,
    createFileController,
    retrieveFileController,
    updateFileController,
    deleteFileController
}