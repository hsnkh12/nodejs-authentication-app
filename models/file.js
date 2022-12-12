const db = require('../utils/database')


module.exports = class File{

    constructor(userID, content, dateCreated){
        this.userID = userID
        this.content = content
        this.dateCreated = dateCreated
    }

    static getAllFiles(){

    }

    static getFileById(fileID){

    }

    static deleteFileById(fileID){

    }

    async saveFile(fileID=null){

        if(this.#fileDataIsValid() == false){
            throw new Error("Data invalid")
        }

        return fileID == null ? this.#insertNewFileToDatabase() : this.#updateFileData(fileID)

    }

    #fileDataIsValid(){
        // Validation
        return true
    }

    #insertNewFileToDatabase(){
        this.dateCreated = this.#convertDateToString(this.dateCreated)
        return db.execute('INSERT INTO FILE(user_id, content, date_created) VALUES (?,?,STR_TO_DATE(?, "%Y-%m-%d"),STR_TO_DATE(?, "%Y-%m-%d"))',
        [this.userID, this.content, this.dateCreated])

    }

    #updateFileData(fileID){
        return db.execute('UPDATE File SET content = ? WHERE file_id = ?',
        [this.content, fileID])
    }

    #convertDateToString(date){
        return date.toISOString().slice(0,10)
    }

    


}