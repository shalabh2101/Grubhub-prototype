//import the require dependencies
var express = require('express');
var app = express();
//var redis   = require("redis");
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
//var client  = redis.createClient();
//const redisStore = require('connect-redis')(session);


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000,
    cookie:{email:""}
    //store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database:"grubhubmain"
  });

  //*****handle errors */
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  }); 

//Route to store the sign up information of buyer
app.post('/signupbuyer',function(req,res){

//*****handle errors */ HANDLING ERROR OF SQL
console.log("Inside the buyer/owner sign up page")

console.log("resname", req.body.resname);
console.log("resname", req.body.reszipcode);

console.log(req.body)

if(req.body.type==='buyer')
    { sql = "INSERT INTO userprofile VALUES (0,?,?,?)";

    con.query(sql,[req.body.name,req.body.password,req.body.email] ,function (err, result) {
        if (err) 
          {res.writeHead(404,{
            'Content-Type' : 'application/json'
           
        });
        res.end("Not able to connect to db")
        console.log("Error",err)
        }
        else
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end("Inserted");
            console.log("1 record inserted");
        }
        
        });
}

     else
   {  sql = "INSERT INTO ownerprofile VALUES (0,?,?,null,null,?,?,null,null)";


con.query(sql,[req.body.name,req.body.resname,req.body.password,req.body.resname], function (err, result) {
if (err) 
  {res.writeHead(404,{
    'Content-Type' : 'application/json'
   
});
res.end("Not able to connect to db")
console.log("Error",err)
}
else
{
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    res.end("Inserted");
    console.log("1 record inserted");
}

});

   }

});


app.post('/getdata',function(req,res){
    console.log("Inside the getting name method")
    console.log("  session email "+user.email)

    console.log("req body  ",req.body)


    if(req.body.type === 'buyer')
     { sql = "select * from  userprofile where email=?";
   

    con.query(sql,[ user.email], function (err, result) {
        if (err) {
                      res.writeHead(404,{
            'Content-Type' : 'application/json'
           
        });
        res.end("Not able to connect to db")
        console.log("Error",err)
        }
        else
        {
            // res.writeHead(202,{
            //     'Content-Type' : 'application/json'
            // });
       
            console.log("result get name",result[0])
            const data ={
                
                name:result[0].Name
            }
         res.send(result[0]);

        }
});

     }
     else
{
    
      sql = "select * from  grubhubmain.ownerprofile where email=?";

      con.query(sql,[ req.body.email], function (err, result) {
        if (err) {
                      res.writeHead(404,{
            'Content-Type' : 'application/json'
           
        });
        res.end("Not able to connect to db")
        console.log("Error",err)
        }
        else
        {
            // res.writeHead(202,{
            //     'Content-Type' : 'application/json'
            // });
       
            console.log("result get name",result[0])
            if( result[0] === undefined )
            { res.end("No data found");
            console.log("no data")
        }
            else{
            const data ={
                
                name:result[0].Name
            }
         res.send(result[0]);}

        }
});

     




}
    });

var user={
    name:"",
    email:""
}

app.post('/signinbuyer',function(req,res){

    //*****handle errors */ HANDLING ERROR OF SQL
    console.log("Inside the buyer sign IN page");
     console.log(req.body);
    if(req.body.type==='buyer')
     sql = "select password from  userprofile where email=?";
     else
     sql = "select password from  ownerprofile where email=?";

    con.query(sql,[req.body.email], function (err, result) {
    if (err) 
      {res.writeHead(404,{
        'Content-Type' : 'application/json'
       
    });
    res.end("Not able to connect to db")
    console.log("Error",err)
    }
    else
    {
        console.log(" result is "+result+'end'+'  rres legth'+result.length);
        if(result.length===0)
        {
            res.writeHead(204,{
                'Content-Type' : 'application/json'
            })
            res.end("No data");
        }
        else{
        // checking passwords from database
       // console.log("result[0].Password ",result[0]);
        if(req.body.password === result[0].password)
         {
              //##########return code for successful login
            res.writeHead(202,{
                'Content-Type' : 'application/json'
            })
            res.end("Success");

           user.email=req.body.email;
           // req.session.email=req.body.email;
         }
         else
         {
            // res.writeHead(401,{
            //     'Content-Type' : 'application/json'
            // })
            res.end("Incorrect Password");

         }
        }
    }
    
    });
    
    });



//update the buyer information from profile page
    app.post('/updatebuyer',function(req,res){

        //*****handle errors */ HANDLING ERROR OF SQL
        console.log("Inside the update buyer backend page")
        
        console.log(req.body)
         sql = "update userprofile set name=?, phonenumber=?,password=? where email=?";
        con.query(sql,[req.body.name,req.body.phonenumber,req.body.password,req.body.email], function (err, result) {
        if (err) 
          {res.writeHead(404,{
            'Content-Type' : 'application/json'
           
        });
        res.end("Not able to connect to db--update buyer")
        console.log("Error",err)
        }
        else
        {
            console.log(" result is "+result+'end'+'  rres legth'+result.length);
            res.writeHead(200,{
                'Content-Type' : 'application/json'
               
            });
            res.end("Success");
        }
        
       
    
        });
        
        });


  //Food Search
    app.post('/searchfood',function(req,res){

        //*****handle errors */ HANDLING ERROR OF SQL
        console.log("Inside the searchfood  backend page")
        
        console.log(req.body)
         sql = "select Item.Rid as Id,Restaurent.name as resname,Item.Name as itemname,Cuisine from Item inner join Restaurent on Item.Rid=Restaurent.Rid where Item.Name=?"
        con.query(sql,[req.body.food], function (err, result) {
        if (err) 
          {res.writeHead(404,{
            'Content-Type' : 'application/json'
           
        });
        console.log("Error",err)
        res.end("Not able to connect to db--update buyer")
       
        }
        else
        {   console.log("checking")
            console.log(result);
            res.send(result);
        }
        
     });
        
});    




        app.post('/getrestaurentmenu',function(req,res){

            //*****handle errors */ HANDLING ERROR OF SQL
            console.log("Inside the searchfood  backend page")
            
            var result1check;
            var result2check;
            var result3check;

            console.log(req.body)
            sql="select ItemId, Item.Rid as Rid,Item.Name as name,Price as price ,Quantity as quantity from Item inner join Restaurent on Item.Rid=Restaurent.Rid  where Sections=? and Item.Rid=?"; 
            con.query(sql,[req.body.type,req.body.id], function (err, result) {
            if (err) {
            //   {res.writeHead(404,{
            //     'Content-Type' : 'application/json'
               
            // });
            console.log("Error",err)
            res.end("Not able to connect to db--update buyer")
         
            }
            else
            {   console.log("breakfast Success")
                 result1=result;
                 result1check=true;
                 console.log(result);
                 res.send(result) 
        
             }   
            }) ;
            
//             sql="select ItemId, Item.Rid as Rid,Item.Name as name,Price as price from Item inner join Restaurent on Item.Rid=Restaurent.Rid where Sections='lunch' and Item.Rid=?"; 
//              con.query(sql,[req.body.id], function (err, result) {
//              if (err) {
//             //    {res.writeHead(404,{
//             //      'Content-Type' : 'application/json'
                
//             //  });
//              res.end("Not able to connect to db--update buyer")
//              console.log("Error",err)
//              }
//              else
//              {   console.log("breakfast Success")
//                   result2=result;  console.log(result2);
//               }   
//             });

//               sql="select ItemId, Item.Rid as Rid,Item.Name as name,Price as price from Item inner join Restaurent on Item.Rid=Restaurent.Rid where Sections='dinner' and Item.Rid=?"; 
//               con.query(sql,[req.body.id], function (err, result) {
//               if (err) {
//             //     {res.writeHead(404,{
//             //       'Content-Type' : 'application/json'
                 
//             //   });
//               res.end("Not able to connect to db--update buyer")
//               console.log("Error",err)
//               }
//               else
//               {   console.log("breakfast Success")
//                    result3=result;
//                    console.log(result3);
//                 }   
//             });
//             // sql="select ItemId, Item.Rid as Rid,Iten.Name as name,Price as price from Item inner join Restaurent on Item.Rid=Restaurent.Rid where section='breakfast' and Rid=?"; 
 
//          let data=
//         {

//            breakfast:result1,
//            lunch:result2,
//            dinner:result3
//         }
//         console.log("data is")
// console.log(data);
//             res.send(data) 
        
            
            
            });    

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");