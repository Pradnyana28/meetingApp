var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    swig = require('swig'),
    routes = require('./routes/index');

// Port
var port = 2525;

// Connect to database
var db = "mongodb://localhost/meetingApp";
mongoose.connect(db);

// Setup view engine
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/', routes);
app.listen(port, function() {
    console.log('App is listening on port '+ port);
})
