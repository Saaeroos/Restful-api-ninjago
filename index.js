const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongo db
mongoose.connect('mongodb://Moode:moode@ds151348.mlab.com:51348/ninja-go');
const routes = require('./routes/api'); //current directory and the folder  and the file route
//set up express app

mongoose.Promise = global.Promise;
//middleware for the front end
app.use(express.static("public"));

app.use(bodyParser.json());
//initialize routes//route handler
app.use('/api', routes);
//error handling middleware
app.use(function( err, req, res, next){
//console.log(err);
res.status(422).send({error:err.message});
});



//listen for requests
//app.listen( process.env.port || 4000, function(){
    var port = 8080;
    app.listen(process.env.PORT || port, function(){
        console.log('your listening to port'+port)
    });
    
    