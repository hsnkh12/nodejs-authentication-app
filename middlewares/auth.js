const jwt = require('jsonwebtoken');
const User = require('../models/user')
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

function verifyTokenMiddleware(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
}


function verifyUserMiddleware(req, res, next){

  jwt.verify(req.token, JWT_SECRET_KEY, (err, data) => {
    if(err) {
      res.sendStatus(403);
    } else{
      req.userID = data.user.user_id;
      next();
    }})

}

async function verifyAdminMiddleware(req, res, next){

  try{

    const user = await User.getUserById(req.userID.toString())

    if ( user[0][0].is_admin == true ){
      next()
    } else {
      res.sendStatus(401)
    } 
  }
  catch(error){
    console.log(error)
    res.sendStatus(401)
  }

  
}

module.exports = {
    verifyTokenMiddleware,
    verifyUserMiddleware,
    verifyAdminMiddleware
}