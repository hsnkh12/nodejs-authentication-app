const db = require('../utils/database')
const {PasswordManager} = require('../utils/password')

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

    static async getAllUsers(){
        return await db.execute('SELECT user.email, user.user_id FROM USER')
    }

    static async getUserById(userID){
        return await db.execute('SELECT * FROM User WHERE user_id = ?',[userID])
    }

    static async getUserByEmail(userEmail){
        return await db.execute('SELECT * FROM User WHERE email = ?',[userEmail])
    }

    static async deleteUserById(userID){
        return await db.execute('DELETE FROM User WHERE user_id = ?',[userID])
    }

    async saveUser(userID=null){

        if(this.#userDataIsValid() == false){
            throw new Error("Data invalid")
        }

        this.lastLogin = this.#convertDateToString(this.lastLogin)

        if(userID == null){

            this.dateJoined = this.#convertDateToString(this.dateJoined)            
            this.password = await this.#hashPassword(this.password)
            return await this.#insertUserDataToDatabase()

        } else {
            
            return await this.#updateUserData(userID)
            
        }

        
    }

    async #hashPassword(password){
        return await PasswordManager.hashPassword(password)
    }

    #userDataIsValid(){
        // Validation
        return true
    }

    async #insertUserDataToDatabase(){
        return await db.execute('INSERT INTO USER(first_name, last_name, email, password, is_admin, is_staff, is_active, date_joined, last_login) VALUES (?,?,?,?,?,?,?,STR_TO_DATE(?, "%Y-%m-%d"),STR_TO_DATE(?, "%Y-%m-%d"))',
        [this.firstName, this.lastName, this.email, this.password, this.isAdmin, this.isStaff, this.isActive, this.dateJoined, this.lastLogin])
    }

    async #updateUserData(userID){
        return await db.execute('UPDATE User SET first_name=? last_name=? email=? password=? is_admin=? is_staff=? is_active=? last_login=STR_TO_DATE(?, "%Y-%m-%d") WHERE user.user_id= ?',
        [userID, this.firstName, this.lastName, this.email, this.password, this.isAdmin, this.isStaff, this.isActive, this.lastLogin])
    }   

    #convertDateToString(date){
        return date.toISOString().slice(0,10)
    }


}