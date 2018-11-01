require('dotenv').load();
const express = require ('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSession = require('express-session');

const app = express();
app.set('view engine' , 'pug');
app.set('views' , './src/views');

app.use(bodyParser.urlencoded({
    parameterLimit : 1000000,
    limit : '50mb',
    extended : true
}))
app.use(bodyParser.json({
    limit : '50mb'
}));
app.use(express.static('./src/public/'));
app.use(helmet())
app.use(expressSession({
    secret : process.env.authSecret,
    saveUninitialized : false,
    resave : false
}));
consign()
    .include('./src/Auth')
    .then('./src/routes.js')
    .then ('./src/models')
    .then ('./src/services')
    .then('./config/dataBase.js')
    .then('./src/controllers')
    .into(app);

module.exports = app;
