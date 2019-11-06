//npm i var mongo = require('./mongo');
//var bcrypt = require('bcrypt');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

function handle_request(msg, callback){
    // console.log("Inside the buyer/owner sign IN page");
    // console.log(msg);

    var collectionString = "";
    if (msg.type === 'buyer')
        collectionString = "userprofile";
    else
        collectionString = "Restaurent";

        var data={};
       data.check=false;
        var checkstatus = "";
       MongoClient.connect(url,async function (err, db) {
        if (err) throw err;
        var dbo = db.db("grubhub");
        var query = { Email: msg.email };
      await  dbo.collection(collectionString).find(query).toArray(function (err, result) {
            if (err) throw err;
            else {
                if (result.length === 0)
                    checkstatus = "No data";
                else {
                    console.log(result);
                    if (msg.password === result[0].Password) {
                        checkstatus = "Success";
          
                        // user.email = msg.email;
                        // user.id = result[0]._id;


                     //   data.email=msg.email;
                        data.id=result[0]._id,
                        data.check=true;
                        data.name=result[0].Name;
                        // STORE THE INFORMATION OF BOTH USER AND RESTAURENT OWNER HERE
                    }
                    else
                        checkstatus = "Incorrect Password";
                }

            }
            data.messege=checkstatus
           // res.send(checkstatus);
         //  res.send(data);
         db.close();
        console.log("-----callback in login &&&&&&&&&&& -----")
        callback(null, data);
        return;
            
        });
    });

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
}

exports.handle_request = handle_request;