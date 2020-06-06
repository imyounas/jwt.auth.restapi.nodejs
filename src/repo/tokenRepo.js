var MongoClient = require('mongodb').MongoClient;


async function saveToken (subId, token){

    const db = await MongoClient.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
    
    try{
    
        console.log('Mongo DB Connected');
        var dbo = db.db("MyStoreDB");
        
        const res = await dbo.collection('idp-tokens').insertOne({
            subjectId: subId,
            token: token
        });
        
         console.log(res.result);
         console.log(`${res.result.n} document inserted`);
            
         db.close();
          
    
    } 
    
    catch(err){
     
        console.log(err);
    }
    

}

async function findToken (token){

    let foundToken = false;
    const db = await MongoClient.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
    
    try{
    
        console.log('Mongo DB Connected');
        var dbo = db.db("MyStoreDB");
        
        const res = await dbo.collection('idp-tokens').findOne({
            token: token
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
    }
    
    return foundToken;

}

async function deleteToken (subId){

    const db = await MongoClient.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
    
    try{
    
        console.log('Mongo DB Connected');
        var dbo = db.db("MyStoreDB");
        
        const res = await dbo.collection('idp-tokens').deleteOne({subjectId: subId});
        
        console.log(res.result);
        console.log(`${res.result.n} document deleted`);
        
        db.close();
    
    } 
    
    catch(err){
     
        console.log(err);
    }
    

}

module.exports = {deleteToken , saveToken , findToken}