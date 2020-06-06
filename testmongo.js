var MongoClient = require('mongodb').MongoClient;


//function saveToken (subId, token){
function xxx(){
    (async () => {
    const db = await MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true});
    try{

        console.log('Mongo DB Connected');
        var dbo = db.db("MyStoreDB");
        
        const res = await dbo.collection('idp-tokens').findOne({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsibmFtZSI6ImFAZ21haWwuY29tIn19LCJpYXQiOjE1OTEzNzEwOTl9.qU54LTrlaYhLH4Hr-l0AkzSt2rR7EFWTZDqGMfNIACc'
        });
        
        console.dir(res, {depth:null});
         
        if(res){

         console.log(`SubjectId of found document: ${res.subjectId.name}`);
         foundToken = true;

        }

         db.close();
        
    }
    catch(err){
        console.log(err);
        //     }
    }
    // MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){

    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     var dbo = db.db("MyStoreDB");
    //     console.log('Mongo DB Connected');
    //     dbo.collection('idp-tokens').insertOne({
    //         subjectId: 123,
    //         token: "token"
    //     }, function(err, res) {
    //         if (err){
    //             console.log(err);
    //         } 
    //         console.log("1 document inserted");
    //         console.log(res.result);
    //         db.close();
    //       });
    
    // });  
    
    console.log('after mongo connect');

})();

console.log('after the async function');

}

xxx();