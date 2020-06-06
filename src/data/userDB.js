module.exports = class UserDB {
   
    static userClaims(userId){

        //return claims against given userId
        return [{role:'admin'},{dept:'finance'},{phone:'12345678'} ];
    }
    
}