const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");


const Note = require('./app/models/note.model');
const User = require('./app/models/user.model');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Succesfuly connected');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

// Default Route
app.get('/', (req, res) => {
    res.json({ 'message': 'Hello RAM' });

});

require('./app/routes/note.route.js')(app);
require('./app/routes/user.route.js')(app);

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
