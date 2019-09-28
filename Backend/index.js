//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
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
console.log("Inside the buyer sign up page")

console.log(req.body)
var sql = "INSERT INTO userprofile VALUES (0,?,?,?)";

con.query(sql,[req.body.name,req.body.email,req.body.password], function (err, result) {
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

});



app.post('/signinbuyer',function(req,res){

    //*****handle errors */ HANDLING ERROR OF SQL
    console.log("Inside the buyer sign IN page")
    
    console.log(req.body)
  

     sql = "select password from  userprofile where email=?";
    
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
        if(req.body.password === result[0].password)
         {
              //##########return code for successful login
            res.writeHead(202,{
                'Content-Type' : 'application/json'
            })
            res.end("Success");

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




//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})

//Route to handle Post Request Call - to create a new book
app.post('/createBook',function(req,res){

    console.log("Inside Create Book Post Request");
    console.log("Req Body : ",req.body);
    const found = books.some(el => el.BookID === req.body.bookId);
    console.log('found:: ', found);
    if (!found) {
        books.push({ BookID: req.body.bookId, Title: req.body.bookName, Author: req.body.bookAuthor });
        res.writeHead(201, {
            'Content-Type': 'text/plain'
        })
        res.end("Book created"); 
    } else {
        res.writeHead(409, {
            'Content-Type': 'text/plain'
        })
        res.end("Book Id already exists"); 
    } 
});

//Route to handle Delete Request Call - to delete an existing book
app.delete('/deleteBook/:id',function(req,res){
    console.log("Inside Delete Book Request");
    console.log("Req Body : ",req.params);
    let originalLength = books.length;
    for( var i = 0; i < books.length; i++){ 
        if ( books[i].BookID === req.params.id) {
          books.splice(i, 1);
          break;
        }
     }
     console.log("bookssss : ",books, books.length);
     if (books.length === originalLength){
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        })
        res.end("Book id not found");
     }
    res.writeHead(204, {
        'Content-Type': 'text/plain'
    })
    res.end("Book deleted"); 
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");