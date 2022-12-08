const db = require('../utils/database')
const PasswordManager = require('../utils/authentication')

module.exports = class User{

    constructor(firstName, lastName, email, password, isAdmin=false, isStaff=true, isActive=true, dateJoined=null, lastLogin){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = PasswordManager.encryptPassword(password)
        this.isAdmin = isAdmin
        this.isStaff = isStaff
        this.isActive = isActive
        this.dateJoined = dateJoined
        this.lastLogin = lastLogin
    }

    static getAllUsers(){
        db.execute('SELECT user.email, user.user_id FROM USER')
    }

    static getUserById(userID){
        db.execute('SELECT * FROM USER WHERE id = ?',[userID])
    }

    static deleteUserById(userID){
        db.execute('DELETE FROM USER WHERE id = ?',[userID])
    }

    saveUser(userID=null){

        if(id != null){

            if(this.#userDataIsValid){
                this.#insertUserDataToDatabase()
            }

            throw 'Data invalid'
        }
    }

    #userDataIsValid(){

    }

    #insertUserDataToDatabase(){
        return db.execute('INSERT INTO USER(first_name, last_name, email, password, is_admin, is_staff, is_active, date_joined, last_login) VALUES (?,?,?,?,?,?,?,?,?)',
        [this.firstName, this.lastName, this.email, this.password, this.isAdmin, this.isStaff, this.isActive, this.dateJoined, this.lastLogin])
    }

    #updateUserData(userID){
        return db.execute('UPDATE USER SET first_name=? last_name=? email=? password=? is_admin=? is_staff=? is_active=? last_login WHERE user.user_id= ?',
        [userID, this.firstName, this.lastName, this.email, this.password, this.isAdmin, this.isStaff, this.isActive, this.lastLogin])
    }   


}