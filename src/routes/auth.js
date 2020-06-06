const express = require("express")
const router = express.Router();
const UserDto = require('../models/userDto')
const AuthService = require('../services/tokenAuthService')
const tokenAuthService = require('../services/tokenAuthService')
const authTokenMW = require('../middlewares/authTokenMW')
const tokenRepo = require('../repo/tokenRepo')

router.post("/token", async (req, res, next) => {
  
  const refreshToken = req.body.token
  if (refreshToken == null) {
    return res.sendStatus(401)
  }
  const tokenFound =  await tokenRepo.findToken(refreshToken); 
  if (!tokenFound){
    return res.sendStatus(403)
  } 

  const result =  tokenAuthService.verifyJWTRefreshToken(refreshToken);
   console.dir(result,{depth:null} );
  if (result && !result.status) {
    return res.sendStatus(403);
  }
  else{
    
    console.log(result.user.name);
      const accessToken = tokenAuthService.generateAccessToken({ name: result.user.name })
      res.json({ accessToken: accessToken })
  }
});

router.post('/logout', async (req, res) => {
  console.log('in logout');
  
  const result =  tokenAuthService.verifyJWTRefreshToken(req.body.token);
  console.dir(result,{depth:null} );
 if (result && !result.status) {
   return res.sendStatus(403);
 }
 else{
   
   console.log(result.user.name);
   await tokenAuthService.removeRefreshToken(result.user.name, req.body.token);
   res.sendStatus(204)
 }

 
});

router.post('/login', async (req, res) => {
  
  // Logic to Authenticate User

  const email = req.body.email
  const password = req.body.password
  
  //After sucecssful authentication
  const loggedInUser = { name: email }

  //todo: verify user name & password here 

  const accessToken = tokenAuthService.generateAccessToken(loggedInUser);
  
  const refreshToken = await tokenAuthService.generateRefreshToken(loggedInUser);

  res.json({ accessToken: accessToken, refreshToken: refreshToken })
});


module.exports = router;