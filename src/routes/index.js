const express = require('express')
const router = express.Router();
const cookieRouter = require('./cookies/cookies.routes')
const sessionRouter = require('./session/session.routes')


router.get('/health', (_req,res)=>{
    const environment = process.env.environment || 'undefinded'
    res.status(200).json({
        success:true,
        health:'Up!',
        environment
    })
})
.use('/cookies', cookieRouter)
.use('/session', sessionRouter)


module.exports = router;