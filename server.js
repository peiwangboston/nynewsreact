// Require Node Modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan'); // for debugging



// Initialize Express for debugging and body parsing
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));


// Serve Static Content
app.use(express.static(process.cwd() + '/public'));



// Database configuration with Mongoose:
//mongoose.connect('mongodb://localhost/nytreact');
mongoose.connect('mongodb://heroku_gfdpk7zb:1183u2pgvfn74gpnhqtcljfpuo@ds151955.mlab.com:51955/heroku_gfdpk7zb');
var db = mongoose.connection;

// Show Mongoose errors
db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

// Log success message once logged into db
db.once('open', function() {
    console.log('Mongoose connection successful.');
});

// Import Article model
var Article = require('./models/Article.js');



// Import Routes/Controller
var router = require('./controllers/controller.js');
app.use('/', router);



// Launch App
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Running on port: ' + port);
});