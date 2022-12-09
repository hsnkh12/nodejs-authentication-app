const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
  
class PasswordManager{

  static async hashPassword(password){

    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);

    return hashed
  }

  static async comparePassword(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
  }

  
}




module.exports = {
  verifyTokenMiddleware,
  PasswordManager
}