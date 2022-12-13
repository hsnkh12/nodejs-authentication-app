const Permission = require('../models/permission')
const User = require('../models/user')
const File = require('../models/file')



const listFileController = async (req, res) =>{

    try{

        const userHasPermission = await Permission.userHasPermissionTo('R', req.userID)

        if( userHasPermission == true){
            const files = await File.getAllFiles()

            return res.json(files[0])
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }
}

const createFileController = async (req, res) =>{

    const body = req.body

    try{

        const userHasPermission = await Permission.userHasPermissionTo('C', req.userID)

        if( userHasPermission == true){
            
            let file =  new File(
                userID = req.userID,
                content = body.content,
                dateCreated = new Date()
            )
    
            await file.saveFile()
            return res.sendStatus(201)

        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const retrieveFileController = async (req, res) =>{

    try{

        const userHasPermission = await Permission.userHasPermissionTo('R', req.userID)

        if( userHasPermission == true){
            
            const file = await File.getFileById(req.params.fileID)
            return res.json(file[0][0])
            
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const updateFileController = async (req, res) =>{

    const body = req.body

    try{

        const userHasPermission = await Permission.userHasPermissionTo('U', req.userID)

        if( userHasPermission == true){
            
            let file =  new File(
                userID = req.userID,
                content = body.content
            )
    
            await file.saveFile(req.params.fileID)
            return res.sendStatus(201)

            
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const deleteFileController = async (req, res) =>{

    try{

        const userHasPermission = await Permission.userHasPermissionTo('D', req.userID)

        if( userHasPermission == true){
            
            await File.deleteFileById(req.params.fileID)
            return res.sendStatus(201)

        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }
}

const listUserController = async (req, res) =>{

    try{

        const userHasPermission = await Permission.userHasPermissionTo('R', req.userID)

        if( userHasPermission == true){
            
            const users = await User.getAllUsers()
            return res.json(users[0])
            
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const createUserController = async (req, res) =>{

    const body = req.body

    try{

        const userHasPermission = await Permission.userHasPermissionTo('S', req.userID)

        if( userHasPermission == true){
            
            const date = new Date()
        
            let user = new User(
                firstName= body.first_name,
                lastName= body.last_name,
                email= body.email,
                password= body.password,
                isAdmin = false,
                isStaff = false,
                isActive= true,
                dateJoined = date,
                lastLogin = date,
            )

            await user.saveUser()

            return res.sendStatus(201)
            
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const retrieveUserController = async (req, res) =>{

    try{

        const userHasPermission = await Permission.userHasPermissionTo('R', req.userID)

        if( userHasPermission == true){
            
            const user = await User.getUserById(req.params.userID)
            return res.json(user[0][0])
            
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const updateUserController = async (req, res) =>{

    const body = req.body

    try{

        const userHasPermission = await Permission.userHasPermissionTo('S', req.userID)

        if( userHasPermission == true){
            
            const date = new Date()
        
            let user = new User(
                firstName= body.first_name,
                lastName= body.last_name,
                email= body.email,
                password= body.password,
                isAdmin = false,
                isStaff = false,
                isActive= true,
                lastLogin = date,
            )

            await user.saveUser(req.params.userID)

            return res.sendStatus(201)
            
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const deleteUserController = async (req, res) =>{

    try{

        const userHasPermission = await Permission.userHasPermissionTo('S', req.userID)

        if( userHasPermission == true){
            
            await User.deleteUserById(req.params.userID)
            res.sendStatus(201)
            
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const listPermissionController = async (req, res) =>{

    try{

        const userHasPermission = await Permission.userHasPermissionTo('S', req.userID)

        if( userHasPermission == true){
            
            const permissions = await Permission.getAllPermissions()
            return res.json(permissions[0])

        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const createPermissionController = async (req, res) =>{

    const body = req.body

    try{

        const userHasPermission = await Permission.userHasPermissionTo('S', req.userID)

        if( userHasPermission == true){
            
            let permission = new Permission(
                permission_code = body.permission_code
            )

            await permission.savePermission()
            return res.sendStatus(201)
            
        } else {
            return res.sendStatus(401)
        }

    }
    catch(error){
        console.log(error)
        return res.sendStatus(404)
    }

}

const deletePermissionController = async (req, res) =>{

    try{

        const userHasPermission = await Permission.userHasPermissionTo('S', req.userID)

        if( userHasPermission == true){
            
            await Permission.deletePermissionById(req.params.perCODE)
            return res.sendStatus(201)
            
        } else {
            return res.sendStatus(401)
        }

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
    deleteFileController,
    listUserController,
    createUserController,
    retrieveUserController,
    updateUserController,
    deleteUserController,
    listPermissionController,
    createPermissionController,
    deletePermissionController
}