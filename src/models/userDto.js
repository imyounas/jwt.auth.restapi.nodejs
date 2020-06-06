module.exports = class UserDto {
      
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password; 
        this.setId();
     }

     setId(){
        this.id = Date.now().toString();
     }
}