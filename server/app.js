const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.get('/random', function(req, res){
  var id = req.params.id;
  var baseURL = 'http://api.petfinder.com/';
  var key = process.env.PETFINDER_KEY;
  var query = baseURL + 'pet.getRandom';
      query += '?key=' + key;
      query += '&animal=cat';
      query += '&output=basic';
      query += '&format=json';
  request(query, function (error, response) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(response.body).petfinder.pet.contact.phone.$t);
      res.send(JSON.parse(response.body).petfinder.pet.contact.phone); // Print the google web page.
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  });
});

app.use(express.static('server/public'));

app.listen(4000, function(){
  console.log('running on port', 4000);
});
