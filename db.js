// Option one 
const {MongoClient} = require('mongodb')
const uri = "mongodb://localhost:27017/bookStore";
let dbConnection 

module.exports={
connectToDb: (cb)=>{
    MongoClient.connect(uri)
    .then((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err =>{
        console.log(err);
        return cb(err)
      })
},
getDb:()=>dbConnection
}

// Option Two 
// const {MongoClient} = require('mongodb')
// const uri = "mongodb://localhost:27017/bookStore";

// const client = new MongoClient(uri);
//  const db = client.db();
//  module.exports=db;
