const app = require('express')()
const { adminRoutes} = require('./routers/admin')
const { indexRoutes} = require('./routers/index')
const {verifyTokenMiddleware} = require('./utils/authentication')


app.use('/', indexRoutes)
app.use('/admin', verifyTokenMiddleware, adminRoutes)


app.listen('8000')