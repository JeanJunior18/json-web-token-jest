const jwt = require('jsonwebtoken')
const { secret } = require('./authConfig.json')

module.exports = (req,res,next) =>{
    
    const token = req.headers.token

    if(!token)
        return res.status(401).send({error: 'No token provided'})


    jwt.verify(token, secret, (err, decoded)=>{
        if(err)
            return res.status(401).send({error: 'Token Invalid'})

        req.userId = decoded.id
        return next()
    })
}