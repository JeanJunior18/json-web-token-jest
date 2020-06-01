const jwt = require('jsonwebtoken')
const { secret } = require('./authConfig.json')

module.exports = (req,res,next) =>{
    
    const token = req.headers.token

    if(!token)
        return res.status(401).send({error: 'No token provided'})


    jwt.verify(token, secret, (err, decoded)=>{
        if(err)
            return res.status(401).send({error: 'Token Invalid'})
        /**
         * The decode variable shows all the data saved in the token
         * 
         * You can send this data to the controller via request
         */
        console.log(decoded)
        req.jwtdata = decoded
        return next()
    })
}