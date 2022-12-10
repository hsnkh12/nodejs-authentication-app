const express = require('express')
const { adminRoutes} = require('./routers/admin')
const { indexRoutes} = require('./routers/index')
const { authRoutes } = require('./routers/auth')
const {verifyTokenMiddleware, verifyUserMiddleware, verifyAdminMiddleware} = require('./middlewares/auth')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))

app.use('/auth', authRoutes)
app.use('/',verifyTokenMiddleware, verifyUserMiddleware,  indexRoutes)
app.use('/admin', verifyAdminMiddleware, adminRoutes)


app.listen('8000')