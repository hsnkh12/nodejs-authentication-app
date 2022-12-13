const db = require('../utils/database')


// SUP: Super user. Have the auth to everything
// CRUD: can only (creat - read - update - delete) data except permissions and users
// CRU: : can only (creat - read - update) data except permissions and users
// R: Oly read the data with no auth to any modification

module.exports = class Permission{

    constructor(permissionCode){
        self.permissionCode = permissionCode
    }

    static async getAllPermissions(){
        return await db.execute('SELECT * FROM Permission')
    }

    static async getUserPermessions(userID){
        return await db.execute('SELECT permission_code FROM user_has_permission WHERE user_id = ?',[userID])
    }

    static async userHasPermissionTo(perCODE, userID){
        const permissions = await this.getUserPermessions(userID)

        for( let permission of permissions[0]){
            if (perCODE === permission.permission_code){
                return true
            }
        }
        return false
    }

    static async assignPermissionToUser(perCODE, userID){
        await db.execute('INSERT INTO user_has_permission(user_id, permission_code) VALUES(?,?)',
        [perCODE, userID])
    }

    static async deletePermissionById(perCODE){
        return await db.execute('DELETE FROM Permission WHERE permission_code = ?', [perCODE])
    }

    async savePermission(perCODE){

        if(this.#permissionDataIsValid() == false){
            throw new Error("Data invalid")
        }

        return await this.#insertPermissionDataToDatabase()
    }

    #permissionDataIsValid(){
        // validation
        return true
    }

    async #insertPermissionDataToDatabase(){
        return await db.execute('INSERT INTO Permission(permission_code) VALUES(?)',
        [this.permissionCode])
    }



}