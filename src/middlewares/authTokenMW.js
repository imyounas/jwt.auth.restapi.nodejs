const tokenAuthService = require('../services/tokenAuthService')

function authenticateTokenMW(req, res, next) {
  const authHeader = req.headers['authorization']
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)


  const result = tokenAuthService.verifyJWTAccessToken(token);
  console.log(`result of Access token verifcation ${result}`);
  if (!result.status) {
    return res.sendStatus(403);
  } else {
    req.user = result.user;
    next()
  }
}

module.exports = authenticateTokenMW