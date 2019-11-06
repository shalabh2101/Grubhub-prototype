var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var mongoose = require('mongoose');

var url = "mongodb://localhost:27017/";

function handle_request(req,callback){
    console.log("-------Post Order---------");
    var checkstatus="";
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("grubhub");
        // var obj = { Name: user.name,id:user.id, Rid:user.rid,Description:req.body.order, RestaurentName: user.restname,RestaurentImage:user.restimage,status:'n'};
        var obj = { Name: req.name,id:req.id, Rid:req.rid,Description:req.order, RestaurentName: req.restname,RestaurentImage:req.restimage,status:'n'};
        await dbo.collection("Orders").insertOne(obj, function (err, result) {
            if (err) checkstatus = "Failed Order Insert"
            else checkstatus = "Success Order inserted"
            db.close();
           // res.end(checkstatus)
           callback(null, checkstatus);
           return;
        });

    });

}

exports.handle_request=handle_request