const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

router.get('/', async (req, res) => {
    
})

router.get('/files', controllers.listFileController)
router.post('/files', controllers.createFileController)

router.get('/files/:fileID', controllers.retrieveFileController)
router.put('/files/:fileID', controllers.updateFileController)
router.delete('/files/:fileID', controllers.deleteFileController)



module.exports = {
    indexRoutes: router
}