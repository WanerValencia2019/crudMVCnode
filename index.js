const express = require('express');
const app = express();
const session = require('express-session');

const sessionConfig = {
    secret: "bad guys",
    resave: true,
    saveUninitialized: true
}


const logger = require('morgan');
const favicon = require('serve-favicon')(__dirname + "/public/favicon.ico");

//ROUTES
const pollRoutes = require('./routes/index').poll;
const authRoutes = require('./routes/index').auth;

const port = (process.env.PORT || 8080);
const staticDIR = express.static(__dirname + "/public");
const viewsDIR = __dirname + "/views";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig))

app.use('/static', staticDIR);
app.use(favicon);
app.set('views', viewsDIR);
app.set('view engine', 'pug');
app.set('port', port);

app.use(authRoutes);
app.use('/', pollRoutes);

module.exports = app;