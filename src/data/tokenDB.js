let _refreshTokens = [];
module.exports = class TokenDB {
   
    static get refreshTokens() { return _refreshTokens; }
    static set refreshTokens(tokens) {  _refreshTokens = tokens; }
}