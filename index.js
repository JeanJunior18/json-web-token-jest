const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json())

const { secret } = require('./authConfig.json');
const verifyToken = require('./verifyToken');

/* Generate JWT  */
function jwtGenerator(params={}){
  return jwt.sign(params, secret,{ expiresIn:86400 } );
};

/* Routes */

app
  .get('/get-token', (req, res)=>{
    return res.json({token: jwtGenerator({id:'USER_ID', name: 'USER_NAME'})});
  })

  .get('/check-token', (req, res)=>{
    const { token } = req.body;
    const infos = jwt.verify(token, secret)
    return res.json(infos)
  })

  .get('/', verifyToken, (req, res)=>{
    const jwt_data = req.jwtdata;
    const sucess = 'Auth sucess'
    return res.json({jwt_data, sucess});
  })

module.exports = app

