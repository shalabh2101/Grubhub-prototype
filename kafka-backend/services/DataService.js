var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var mongoose = require('mongoose');

var url = "mongodb://localhost:27017/";

function handle_request(msg, callback){
    

    console.log("----getting Data --------")

    var checkstatus = "";
    if (msg.type === 'buyer') {
        MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            var dbo = db.db("grubhub");
            console.log("user.email");
           // console.log(user.email);
            
       //     var obj = { Email: user.email };
            var obj = { Email: msg.email };
            await dbo.collection("userprofile").find(obj).toArray( function (err, result) {
                if (err) checkstatus = "Failed Getdata in Buyer"
                else {
                    console.log("result[0]");
                    console.log(result[0]);
                   // res.send(result[0]);
                   callback(null, result[0]);
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
            var obj = { Email: msg.email };
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
               // res.send(checkstatus);
               callback(null, "checkstatus");
               return;
            });
        });
     

    }

}

exports.handle_request=handle_request







