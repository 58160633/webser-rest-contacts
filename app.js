const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const subjectRoutes = require('./api/routes/subjects');
const studentRoutes = require('./api/routes/students');   
const contactsRoutes = require('./api/routes/contacts');   
 
const mongodbUri = 'mongodb://it58160633:kiseki2539@ds215709.mlab.com:15709/it58160633';
mongoose.connect(mongodbUri);
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

app.use('/subjects', subjectRoutes);
app.use('/students', studentRoutes);
app.use('/contacts', contactsRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;