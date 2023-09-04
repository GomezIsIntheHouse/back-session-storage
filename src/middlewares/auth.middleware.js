const authMiddleware = (req, res, next)=>{
    if(!req.session.username || !req.session.password){
        res.status(203).json({
            success:false,
            Message:"User not logged in"
        })
    }
    //el next me indica que en caso de que pase la validacion anterior, que el programa puede continuar.4¿

    next();
}

module.exports = authMiddleware; 