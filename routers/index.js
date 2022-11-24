const express = require('express');
const router = express.Router();
const {verifyTokenMiddleware} = require('../utils/authentication')
const controllers = require('../controllers/index')

router.get('/', async (req, res) => {
    
})

router.get('/files',verifyTokenMiddleware, controllers.listFileController)
router.post('/files',verifyTokenMiddleware, controllers.createFileController)

router.get('/files:fileID',verifyTokenMiddleware, controllers.retrieveFileController)
router.put('/files/:fileID',verifyTokenMiddleware, controllers.updateFileController)
router.delete('/files/:fileID',verifyTokenMiddleware, controllers.deleteFileController)

router.post('/register', controllers.registerController)
router.post('/login', controllers.loginController)
router.post('/logout',verifyTokenMiddleware, controllers.logoutController)


module.exports = {
    indexRoutes: router
}