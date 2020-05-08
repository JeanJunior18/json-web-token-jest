const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json())

const { secret } = require('./authConfig.json');

const verifyToken = require('./verifyToken');

function jwtGenerator(params={}){
  return jwt.sign(params, secret,{ expiresIn:86400 } );
};

app.get('/get-token', (req, res)=>{
  return res.json({token: jwtGenerator({id:'ID_DO_USUARIO'})});
});

app.get('/check-token', (req, res)=>{
  const { token } = req.body;
  const infos = jwt.verify(token, secret)
  return res.json(infos)
});

app.get('/', verifyToken, (req, res)=>{
  return res.json({sucess: 'Chegoooou'});
});

app.listen(3300, console.log('Running on 3300'));

