const db = require('../utils/database')


module.exports = class File{

    constructor(userID, content, dateCreated=null){
        this.userID = userID
        this.content = content
        this.dateCreated = dateCreated
    }

    static async getAllFiles(){
        return await db.execute('SELECT file_id, date_created FROM Files')
    }

    static async getFileById(fileID){
        return await db.execute('SELECT * FROM File WHERE file_id = ?', [fileID])
    }

    static async getUserFiles(userID){
        return await db.execute('SELECT file_id, date_created FROM File WHERE user_id = ?',[userID])
    }

    static async deleteFileById(fileID){
        return await db.execute('DELETE FROM File WHERE file_id = ?', [fileID])
    }

    async saveFile(fileID=null){

        if(this.#fileDataIsValid() == false){
            throw new Error("Data invalid")
        }

        return fileID == null ? await this.#insertNewFileToDatabase() : await this.#updateFileData(fileID)

    }

    #fileDataIsValid(){
        // Validation
        return true
    }

    async #insertNewFileToDatabase(){
        this.dateCreated = this.#convertDateToString(this.dateCreated)
        return await db.execute('INSERT INTO FILE(user_id, content, date_created) VALUES (?,?,STR_TO_DATE(?, "%Y-%m-%d"))',
        [this.userID, this.content, this.dateCreated])

    }

    async #updateFileData(fileID){
        return await db.execute('UPDATE File SET content = ? WHERE file_id = ?',
        [this.content, fileID])
    }

    #convertDateToString(date){
        return date.toISOString().slice(0,10)
    }

    


}