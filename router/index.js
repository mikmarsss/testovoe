const Router = require('express').Router;
const router = new Router()
const userRouter = require('./userRouter')


router.use('/user', userRouter)

module.exports = router