const express = require("express");
const router=express.Router();
var kafka=require("../kafka/client");
var mongoose = require('mongoose');

var mongo = require('mongodb');
//var url="mongodb+srv://sneema7:Nmat@123@grubhub-fribs.mongodb.net/test?retryWrites=true&w=majority";
var url = "mongodb://localhost:27017/";
var MongoClient = mongo.MongoClient;

router.post('/', function (req, res) {

    //*****handle errors */ HANDLING ERROR OF SQL
    console.log("Inside the searchfood  backend page")

    MongoClient.connect(url,async function (err, db) {
        if (err) throw err;
        var dbo = db.db("grubhub");
        var query = { Name: req.body.food };
        await  dbo.collection("Items").find(query).toArray(function (err, result) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'application/json'

            });
            console.log("Error", err)
            res.end("Not able to connect to db--update buyer")

        }
        else {
            console.log("checking")
            console.log(result);
            res.send(result);
        }
          //  res.send(checkstatus);
            db.close();
        });
    });


    console.log(req.body)

});

module.exports = router;