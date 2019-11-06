var connection =  new require('./kafka/Connection');
var mongoose = require('mongoose');



//topics files
//var signin = require('./services/signin.js');
var Books = require('./services/books.js');
var signupService=require('./services/signupService.js');
var loginService=require('./services/loginService.js');
var PastOrderService=require('./services/PastOrderService.js');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
        console.log('server is running ');
        consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        switch(topic_name)
        {
            case 'signup_topic' : 
            signpService.handle_request(data.data,function(err,res){
                response(data,res,producer);
                return ;
               })
            break;
            
           case 'login_topic' : 
            loginService.handle_request(data.data,function(err,res){
                response(data,res,producer);
                return ;
               })
            break;

           case 'pastOrder_topic' : 
           PastOrderService.handle_request(data.data,function(err,res){
                response(data,res,producer);
                return ;
               })
            break;

            
        }
        
        
    });
}

function response(data,res,producer){

    console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
   
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books);
handleTopicRequest("signup_topic",signupService);
handleTopicRequest("login_topic",loginService);
handleTopicRequest("pastOrder_topic",PastOrderService);


