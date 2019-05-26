const express = require('express');
const bodyParser = require('body-parser');
const config = require('./../config.js')

const travellerRoute = require('./route/traveller.route');
const app = express();

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.username}:${config.password}@ds261136.mlab.com:61136/traveller_app`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

//Allow Cors and custom header i.e. access-token
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://abhay07.github.io');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, access-token');
  
  //For options call, just send 200 OK response
  if(req.method === 'OPTIONS'){
  	res.send();
  }
  else{
  	next();
  }
});

//Routes assignment
app.use('/api/v1/travellers',travellerRoute)

app.listen(8087, () => console.log('Example app listening on port 8087!'));