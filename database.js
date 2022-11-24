const mysql = require('mysql2')
require("dotenv").config();


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_auth',
    password: process.env.DATABASE_PASSWORD
})

module.exports = db.promise();