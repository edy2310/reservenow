var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Admin = require('../models/admin');

router.post('/', async(req, res)=>{
  let reqUser = req.body.user;
  let reqPass = req.body.pass;

  let dbUser = await Admin.findAll();
  if( (reqUser == dbUser[0].user) && (reqPass == dbUser[0].pass) ){
    var token = await jwt.sign({ 'user': dbUser[0].user}, 'Soft Kitty');
    res.json({
      'code': '200',
      'msg': 'login correct',
      token 
    });
  }
  else{
    res.json({
      'code': '401',
      'msg': 'login incorrect'
    });
  } 
  
});

module.exports = router;