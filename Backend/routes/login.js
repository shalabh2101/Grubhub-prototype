const express =require("express");
const router=express.Router();
var kafka=require("../kafka/client")
var mongoose = require('mongoose');

var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/', function (req, res) {

    console.log("Inside the buyer/owner sign IN page");
    console.log(req.body);

    // var collectionString = "";
    // if (req.body.type === 'buyer')
    //     collectionString = "userprofile";
    // else
    //     collectionString = "Restaurent";

    //     var data={};
    //    data.check=false;
    //     var checkstatus = "";
    //    MongoClient.connect(url,async function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("grubhub");
    //     var query = { Email: req.body.email };
    //   await  dbo.collection(collectionString).find(query).toArray(function (err, result) {
    //         if (err) throw err;
    //         else {
    //             if (result.length === 0)
    //                 checkstatus = "No data";
    //             else {
    //                 console.log(result);
    //                 if (req.body.password === result[0].Password) {
    //                     checkstatus = "Success";
          
    //                     // user.email = req.body.email;
    //                     // user.id = result[0]._id;


    //                  //   data.email=req.body.email;
    //                     data.id=result[0]._id,
    //                     data.check=true;
    //                     data.name=result[0].Name;
    //                     // STORE THE INFORMATION OF BOTH USER AND RESTAURENT OWNER HERE
    //                 }
    //                 else
    //                     checkstatus = "Incorrect Password";
    //             }

    //         }
    //         data.messege=checkstatus
    //        // res.send(checkstatus);
    //        res.send(data);
    //         db.close();
    //     });
    // });


    kafka.make_request("login_topic",req.body,function(err,results){
        console.log("--------Inside login request----------");
        return res.status(200).send(results);
    })
   
});




module.exports=router;