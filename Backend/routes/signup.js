const express =require("express");
const router=express.Router();
var kafka=require("../kafka/client")
var mongoose = require('mongoose');

var mongo = require('mongodb');
var url = "mongodb://localhost:27017/";
//var url="mongodb+srv://sneema7:Nmat@123@grubhub-fribs.mongodb.net/test?retryWrites=true&w=majority";
var MongoClient = mongo.MongoClient;

router.post('/', function (req, res) {

     console.log("Inside the buyer/owner sign up page")
     console.log(req.body)
 
    //  res.writeHead(200, {
    //      'Content-Type': 'application/json'
    //  })
//      var checkstatus = "";
//      if (req.body.type === 'buyer') {
 
 
//          MongoClient.connect(url, async function (err, db) {
//              if (err) {throw err;}else{var dbo = db.db("grubhub");
//              await dbo.collection("userprofile").insertOne({ Name: req.body.name, Email: req.body.email, Password: req.body.password, Phonenumber: "", Imagelocation: "" }, function (err, res) {
//                  if (err) {

//                      checkstatus = "Passed"
//                  }
//                  else {
//                      checkstatus = "Success"
//                  }
//                  db.close();
//              });}
             
 
//          });


//         // //  res.end(checkstatus)
//         callback(null, checkstatus);
//          return res.status(200).send(checkstatus);
//   }
//    else {
//          MongoClient.connect(url, async function (err, db) {
//              if (err) throw err;
//              var dbo = db.db("grubhub");
//              var obj = { Name: req.body.resname, Cuisine: "", OwnerName: req.body.name, Address: "", Ownerimagel: "", RestaurentImage: "", Password: req.body.password, Email: req.body.email, Phonenumber: "", Zipcode: req.body.reszipcode };
//              await dbo.collection("Restaurent").insertOne(obj, function (err, res) {
//                  if (err) checkstatus = "Failed Restaurent Insert"
//                  else checkstatus = "Success Restaurent inserted"
//                  db.close();
//              });
 
//          });
//          res.end(checkstatus)
 
//   }
 

kafka.make_request("signup_topic",req.body,function(err,results){
console.log("--------Inside Make request----------");
return res.status(200).send(results);

})

//return res.status(200).send(checkstatus);
 });

 module.exports=router;