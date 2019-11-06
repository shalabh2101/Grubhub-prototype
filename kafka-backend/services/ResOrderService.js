var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var mongoose = require('mongoose');

var url = "mongodb://localhost:27017/";

function handle_request(req,callback){
    
    MongoClient.connect(url,async function (err, db) {
        if (err) throw err;
        var dbo = db.db("grubhub");
     
      query = {Rid:  req.id   };
         // query = {Rid:  mongoose.Types.ObjectId(user.id)   };
         
      //  var query = { Name: req.food };
      await  dbo.collection("Orders").find(query).toArray(function (err, result) {
        if (err) {
            console.log("Error", err)
          //  res.end("Not able to connect to db--order buyer")
          callback(null, "Not able to connect to db--order buyer");
               return;
        }
        else {
            console.log("Order Success")
            if (result.length >= 1) {
                console.log("GET RESTAURENT ORDERS")
                console.log(result);
                //res.send(result);
                callback(null, result);
                return;
            }
            else {
               // res.send("No data found");
               callback(null, "");
               return;
            }
        }
          //  res.send(checkstatus);
            db.close();
        });
    });


   // //  res.end(checkstatus)
//    console.log("-----callback in service-----")
//    callback(null, checkstatus);

}

exports.handle_request=handle_request