var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var mongoose = require('mongoose');

var url = "mongodb://localhost:27017/";

function handle_request(msg, callback){
    let checkstatus = "";

    console.log("----getting past orders--------")

    var query;
    MongoClient.connect(url,async function (err, db) {
        if (err) throw err;
        var dbo = db.db("grubhub");
         if (msg.type === 'd')
         query = {id: mongoose.Types.ObjectId(msg.id),status:'d'};
       //   query = {id:user.id,status:'d'};
          else
          query = {id:mongoose.Types.ObjectId(msg.id),status:{ $ne :'d'}};
        //  query = {id:user.id,status:{ $ne :'d'}};
    
      //  var query = { Name: msg.food };
      await  dbo.collection("Orders").find(query).toArray(function (err, result) {
        if (err) {
            console.log("Error", err)
            callback(null, "Not able to connect to db--order buyer");
                return;
        //    res.end("Not able to connect to db--order buyer")
        }
        else {
            console.log("Order Success")
            console.log(result);
            if (result.length >= 1) {
    
                var finalresult = [];
                result.forEach(element => {
    
                    var orders = element.Description.split("/");
                    console.log("order is " + orders[0]);
                    orders = orders.slice(1);
                    console.log("order is " + orders[0]);
    
                    const data = {
                        resname: element.resname,
                        orderitems: orders
                    }
                    finalresult.push(data);
                });
                
                console.log(finalresult);
                // res.send(finalresult);
                callback(null, finalresult);
                return;
            }
            else {  //callback(null, data);
                //res.send("No data found");
                callback(null, "No data found");
                return;
            }
    
        }
          //  res.send(checkstatus);
            db.close();
        });
    });

}

exports.handle_request=handle_request







