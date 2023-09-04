const express = require('express')

const router = express.Router();

router.get('/', (_req, res)=>{
    //endpoint que setea una cookie.

    //1er param, nombre
    //2do param, contenido de la cookie
    //3er param, timepo de expiracion
    res.cookie('name','rupert',{maxAge:100000, signed: true} ).send('Cookie set');

})
//signed cookies : firmar una cookie significa, que solo la
// va a aceptar el backend cuando un secreto encriptado, por nuestro propio backend
// coincida con la firma que le mandamos

router.get('/get', (req, res) => {
    res.status(200).json(req.cookies)
})

module.exports = router;