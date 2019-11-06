const express =require("express");
const router=express.Router();
var kafka=require("../kafka/client")
var mongoose = require('mongoose');

var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/', function (req, res) {
    console.log("Inside the getting name method")
 console.log("req body  ", req.body)

  
 var checkstatus = "";
    if (req.body.type === 'buyer') {
        MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            var dbo = db.db("grubhub");
            console.log("user.email");
           // console.log(user.email);
            
       //     var obj = { Email: user.email };
            var obj = { Email: req.body.email };
            await dbo.collection("userprofile").find(obj).toArray( function (err, result) {
                if (err) checkstatus = "Failed Getdata in Buyer"
                else {
                    console.log("result[0]");
                    console.log(result[0]);
                    res.send(result[0]);
                    checkstatus = result[0];

                    //store the info of buyer here 
                    //id , Name, Email, Password, Phonenumber, Imagelocation
              }
                db.close();
            });
        });
       
    }
    else {

        MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            var dbo = db.db("grubhub");
            var obj = { Email: req.body.email };
            await dbo.collection("Restaurent").find(obj).toArray (function (err, result) {
                if (err) checkstatus = "Failed Getdata in Buyer"
                else {
                    if (result.length != 0) {
                        checkstatus = result[0];
                        // user.id = result[0]._id;
                        // user.restimage=result[0].RestaurentImage;
                        // user.restname=result[0].Name;
                        // user.cuisine=result[0].Cuisine;
                    }
                    else
                        checkstatus = "No record found";
                  

                }
                db.close();
                res.send(checkstatus);

            });
        });
     

    }
});



module.exports=router;