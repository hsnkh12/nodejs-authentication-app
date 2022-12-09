const db = require('../utils/database')
const PasswordManager = require('../utils/authentication')

module.exports = class User{

    constructor(firstName, lastName, email, password, isAdmin=false, isStaff=true, isActive=true, dateJoined=null, lastLogin){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.isAdmin = isAdmin
        this.isStaff = isStaff
        this.isActive = isActive
        this.dateJoined = dateJoined
        this.lastLogin = lastLogin
    }

    static getAllUsers(){
        return db.execute('SELECT user.email, user.user_id FROM USER')
    }

    static getUserById(userID){
        return db.execute('SELECT * FROM User WHERE id = ?',[userID])
    }

    static getUserByEmail(userEmail){
        return db.execute('SELECT * FROM User WHERE email = ?',[userEmail])
    }

    static deleteUserById(userID){
        return db.execute('DELETE FROM User WHERE id = ?',[userID])
    }

    saveUser(userID=null){

        if(userID == null){

            if(this.#userDataIsValid){
                return this.#insertUserDataToDatabase()
            }

            throw new Error("Data invalid")
        }
    }

    #userDataIsValid(){
        return true
    }

    #insertUserDataToDatabase(){
        return db.execute('INSERT INTO USER(first_name, last_name, email, password, is_admin, is_staff, is_active, date_joined, last_login) VALUES (?,?,?,?,?,?,?,STR_TO_DATE(?, "%Y-%m-%d"),STR_TO_DATE(?, "%Y-%m-%d"))',
        [this.firstName, this.lastName, this.email, this.password, this.isAdmin, this.isStaff, this.isActive, this.dateJoined, this.lastLogin])
    }

    #updateUserData(userID){
        return db.execute('UPDATE User SET first_name=? last_name=? email=? password=? is_admin=? is_staff=? is_active=? last_login=STR_TO_DATE(?, "%Y-%m-%d") WHERE user.user_id= ?',
        [userID, this.firstName, this.lastName, this.email, this.password, this.isAdmin, this.isStaff, this.isActive, this.lastLogin])
    }   


}