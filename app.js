const express = require('express')
const { adminRoutes} = require('./routers/admin')
const { indexRoutes} = require('./routers/index')
const {verifyTokenMiddleware} = require('./utils/authentication')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', indexRoutes)
app.use('/admin', verifyTokenMiddleware, adminRoutes)


app.listen('8000')