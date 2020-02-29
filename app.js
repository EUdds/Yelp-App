require('dotenv').config();

const PORT = process.env.PORT || 7000;
const EXPRESS = require('express');
const EXPHBS = require('express-handlebars');
const BODY_PARSER = require('body-parser');
const HTTP = require('http');
const REQUEST = require('request');
const RP = require('request-promise');

const APP = module.exports.app = EXPRESS();
const SERVER = HTTP.createServer(APP);

SERVER.listen(PORT, () => {
  console.log(`The pary is happening on ${PORT}, who do you know here?`);
});

APP.set('view engine', 'handlebars');
APP.engine('handlebars', EXPHBS({defaultLayout: 'main'}));

APP.use(EXPRESS.static('assets'));
APP.use(BODY_PARSER.urlencoded({extended: true}));

APP.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

APP.get('/', (req, res) => {
  res.render('welcome');
});

APP.get('/rank/all', (req, res) => {
  console.log(req.query);
  let lat = req.query.lat;
  let long = req.query.long;
  let options = {
    headers : {
      Authorization: 'Bearer ' + process.env.APIKEY
    }
  }
  REQUEST(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&limit=${5}`,options, (err, response, body) => {
    list = JSON.parse(body);  
    res.render('list', {
      resturants: list.businesses
    })
  });
});
