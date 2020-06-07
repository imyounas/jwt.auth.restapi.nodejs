const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const tokenRepo = require('../repo/tokenRepo')
const userDB = require('../data/userDB')

module.exports = class AuthService {
  constructor() {}

  async verifyPassword(userdto) {
    //mysecret
    //const hashedPassword = await bcrypt.compare(userdto.password, 12);
  }

  static verifyJWTRefreshToken(refreshToken) {
    console.log(`refresh token ${refreshToken}`)

    const result = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(`Result: ${result}`);

    if (result) {

      return {
        status: true,
        user: result.user,
        errorMessage: null
      };
    }
    console.log(`token couldn't be verified`)
    return {
      status: false,
      user: null,
      errorMessage: err.message
    }
  }

  static verifyJWTAccessToken(accessToken) {
    console.log(`access token ${accessToken}`)
    const result = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log('verifyJWTAccessToken result is');
    console.dir(result, {
      depth: null
    });

    if (result) {

      return {
        status: true,
        user: result.user,
        errorMessage: null
      };
    }
    console.log(`something went wrong error`)
    return {
      status: false,
      user: null,
      errorMessage: err.message
    }

  }
  static generateAccessToken(user) {

    const userClaims = userDB.userClaims(user.name);
    const token = jwt.sign({
      user: {
        name: user.name
      },
      cliams: userClaims
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s'
    })
    return token;
  }

  static async generateRefreshToken(user) {
    const token = jwt.sign({
      user: {
        name: user.name
      }
    }, process.env.REFRESH_TOKEN_SECRET);
    await tokenRepo.saveToken(user.name, token);
    return token;
  }

  static async removeRefreshToken(userName, token) {
    console.log(`in remove refresh tooken for ${userName}`);
    await tokenRepo.deleteToken(userName, token);
    console.log(`after remove refresh tooken `);
  }


}