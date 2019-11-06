var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;


var url = "mongodb://localhost:27017/";

function handle_request(req,callback){
    let checkstatus = "";
     if (req.type === 'buyer') {
 
         MongoClient.connect(url, async function (err, db) {
             if (err) {throw err;}else{var dbo = db.db("grubhub");
             await dbo.collection("userprofile").insertOne({ Name: req.name, Email: req.email, Password: req.password, Phonenumber: "", Imagelocation: "" }, function (err, res) {
                 if (err) {
                     checkstatus = "Passed"
                 }
                 else {
                     checkstatus = "Success"
                 }
                 db.close();
             });}
             
 
         });


        // //  res.end(checkstatus)
        console.log("-----callback in service &&&&&&&&&&& -----")
        callback(null, checkstatus);
         return;
  }
   else {
         MongoClient.connect(url, async function (err, db) {
             if (err) throw err;
             var dbo = db.db("grubhub");
             var obj = { Name: req.resname, Cuisine: "", OwnerName: req.name, Address: "", Ownerimagel: "", RestaurentImage: "", Password: req.password, Email: req.email, Phonenumber: "", Zipcode: req.reszipcode };
             await dbo.collection("Restaurent").insertOne(obj, function (err, res) {
                 if (err) checkstatus = "Failed Restaurent Insert"
                 else checkstatus = "Success Restaurent inserted"
                 db.close();
             });
 
         });
         console.log("-----callback in service-----")
         callback(null, checkstatus);
        return;
  }


   // //  res.end(checkstatus)
//    console.log("-----callback in service-----")
//    callback(null, checkstatus);

}

exports.handle_request=handle_request