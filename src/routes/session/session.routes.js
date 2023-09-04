const express = require('express')

const router = express.Router();

const statusCode = require('http-status')

const authMiddleware = require('../../middlewares/auth.middleware')

//el middleware se declara en esa parte, para que se ejecute antes que el callback

router.get('/', authMiddleware, (req, res)=>{
    req.session.name = 'Rupert'
    res.status(200).json(req.session.name)

    if(!req.session.contador && req.session.contador != 0){
        req.session.contador = 0
    }
    req.session.contador = req.session.contador + 1;
    res.status(200).send(`<h1>Usted ingreso al servidor ${req.session.contador} veces<h1>`)
})

//la diferencia entre session y las cookies es justamente que
// podemos guardar variables del lado del servidor lo cual me sirve muchisimo
// pq se puede segun un session_id, agarrar  una variable de este cliente
//pero sin que los clientes tengan acceso. 

//es decir que las variables las guardo del lado del back no del front
//y las identifico de donde vienen y quien me las esta pidiendo
//gracias a un session_id . 


//primero guardamos la data de session de un usuario
//segundo, cuando el usuario de desloguea, eliminamos los datos con el destroy.


router.post('/signin',(req,res)=>{
    const PASS = '12345'
    const USER = 'rupert'
    const {USERINPUT, PASSINPUT} = req.body;
    if(!USERINPUT || !PASSINPUT){
        return res.status(400).json({
            success:false,
            message:"User o Pass is missing"
        })
    }
    if(USERINPUT != USER || PASSINPUT != PASS){
        //403 estado prohibido,
        return   res.status(403).json({
                success : false ,
                msg:`${statusCode[403]}, invalid username or password`})
    }
    req.session.username = USERINPUT;
    req.session.password = PASSINPUT;

    res.status(200).json({
        success:true,
        message:"Welcome to rupertChat"
    });
})

//para destruir una session
router.post('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }

        res.status(200).json({
            success:true,
            message: "Session destroyed succesfully"
        })

    })
})


module.exports = router;