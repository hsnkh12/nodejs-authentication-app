const express = require('express');
const router = express.Router();
const controllers = require('../controllers/admin')

router.get('/', async (req, res) => {
    
})

router.post('/login', controllers.loginController)
router.post('/logout', controllers.logoutController)

router.get('/users', controllers.listUserController)
router.post('/users', controllers.createUserController)
router.get('/users/:userID', controllers.retrieveUserController)
router.put('/users/:userID', controllers.updateUserController)
router.delete('/users/:userID', controllers.deleteUserController)

router.get('/files', controllers.listFileController)
router.post('/files', controllers.createFileController)
router.get('/files/:fileID', controllers.retrieveFileController)
router.put('/files/:fileID', controllers.updateFileController)
router.delete('/files/:fileID', controllers.deleteFileController)

router.get('/permissions', controllers.listPermissionController)
router.post('/permissions', controllers.createPermissionController)
router.delete('/permissions/permCode', controllers.deletePermissionController)


module.exports = {
    adminRoutes: router
}