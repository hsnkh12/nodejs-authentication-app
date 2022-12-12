require("dotenv").config();
const User = require('../models/user')
const File = require('../models/file')



const listFileController = async (req, res) => {

    try{

        let files = await File.getUserFiles(req.userID)
        return res.json(files[0])

    }

    catch(error){

        console.log(error)
        return res.sendStatus(404)
    }
}

const createFileController = async (req, res) => {

    const body = req.body

    try{

        let file =  new File(
            userID = req.userID,
            content = body.content,
            dateCreated = new Date()
        )

        await file.saveFile()

        return res.sendStatus(201)

    }

    catch(error){

        console.log(error)
        return res.sendStatus(404)
    }

}

const retrieveFileController = async (req, res) =>{

    try{
        const file = await File.getFileById(req.params.fileID)
        return res.json(file[0][0])
    }

    catch(error){

    }

}

const updateFileController = async (req, res) =>{

    const body = req.body
    try{

        let file =  new File(
            userID = req.userID,
            content = body.content
        )

        await file.saveFile(req.params.fileID)
        return res.sendStatus(201)
    }

    catch(error){

    }

}

const deleteFileController = async (req, res) =>{

    try{

        await File.deleteFileById(req.params.fileID)
        return res.sendStatus(201)

    }

    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}


module.exports = {
    listFileController,
    createFileController,
    retrieveFileController,
    updateFileController,
    deleteFileController
}