var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/MyStoreDB";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("MyStoreDB");
  var myquery = { address: 'Mountain 21' };
  dbo.collection("items").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    console.log(obj);
    db.close();
  });
});