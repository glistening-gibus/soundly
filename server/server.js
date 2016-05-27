var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var db = require('./db-config');
var User = require('./models/User.js');
var Song = require('./models/Song.js');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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
app.listen(port);
console.log('Music happens on port: ' + port);