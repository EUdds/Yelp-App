require('dotenv').config();

const PORT = process.env.PORT || 7000;
const EXPRESS = require('express');
const EXPHBS = require('express-handlebars');
const BODY_PARSER = require('body-parser');
const HTTP = require('http');

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
  res.render('welcome', {
    // options
  })
})
