var express = require('express');
var app = express();
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var morgan = require('morgan');
var db = require('./db-config');
var User = require('./models/User.js');
var Song = require('./models/Song.js');
var bodyParser = require('body-parser');

app.use(morgan('combined'));
//we need this to receive the search input data from the client side
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//serving index.html on client side
//You do not need to use app.get('/'...) because it is taken care of by ReactRouter
app.use(express.static(__dirname + '/../compiled'));

app.get('/users', function(req, res) {
  // getting all users
  User.find({})
    .exec(function(err, users) {
      if (err) {
        return console.error(err);
      } else {
        res.json(users);
      }
    })
});

app.get('/songs', function(req, res) {
  // getting all songs
  Song.find({})
    .exec(function(err, songs) {
      if (err) {
        return console.error(err);
      } else {
        res.json(songs);
      }
    })
});

var port = process.env.PORT || 4568;
app.set('port', port);
app.listen(app.get('port'));
console.log('Music happens on port: ' + app.get('port'));

//require soundcloud package on server side 
var SC = require('node-soundcloud');
 
// initialize soundcloud api 
SC.init({
  id: '0459c5ad7403b5ac30a0112b1411e68b',
  secret: 'ca7a19a59c37ed373dbcbeb71d6d8a74',
});

//I set up the data inside the server for now
//so we can check the input keyword from the client side 
//in our server url: /server
var data;

//when the client posts the search input, server receives and makes an api call to get the corresponding tracks
app.post('/server',function(req,res) {
	data = req.body;
	console.log(req.body.keyword)
	SC.get('/tracks', {
  			q: req.body.keyword,
        limit: 50, 
  			streamable: true
			},function(error, tracks) {
        // if(error) console.log(error);
  			return res.send({statusCode: 200, status: 'OK', data: tracks})
			});
}); 

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

//when you go to localhost:4568/server you will see the data the server is holding if any.
app.get('/server', function(req, res) {
	res.writeHead(200, headers);
  res.end(JSON.stringify(data));
});
