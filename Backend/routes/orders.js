const express =require("express");
const router=express.Router();
var kafka=require("../kafka/client")
var mongoose = require('mongoose');

var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/', function (req, res) {
    console.log("Inside the updateorders  backend page")

    MongoClient.connect(url,async function (err, db) {
        if (err) throw err;
        var dbo = db.db("grubhub");
        var query = { _id: mongoose.Types.ObjectId(req.body.orderid) };
        var newvalues = { $set: {status: req.body.status} };
       
        await  dbo.collection("Orders").updateOne(query,newvalues,function (err, result) {
            if (err) {
                console.log("Error", err)
                res.end("Not able to update to db--order owner")
            }
            else {
                console.log("Order update suces")
    
                res.send("update success");
            }
          //  res.send(checkstatus);
            db.close();
        });
    });

  
});

// router.post('/postorder', function (req, res) {

//     console.log("user details are ", user.email);
//     console.log("user details are ", user.name);
//     console.log("user details are ", user.id);
//     console.log("user details are ", user.rid);

//     var checkstatus="";
//     MongoClient.connect(url, async function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("grubhub");
//         // var obj = { Name: user.name,id:user.id, Rid:user.rid,Description:req.body.order, RestaurentName: user.restname,RestaurentImage:user.restimage,status:'n'};
//         var obj = { Name: req.body.name,id:req.body.id, Rid:req.body.rid,Description:req.body.order, RestaurentName: req.body.restname,RestaurentImage:req.body.restimage,status:'n'};
//         await dbo.collection("Orders").insertOne(obj, function (err, result) {
//             if (err) checkstatus = "Failed Order Insert"
//             else checkstatus = "Success Order inserted"
//             db.close();
//             res.end(checkstatus)
//         });

//     });

// });


module.exports=router;