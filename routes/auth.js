const express = require('express');
const routes = express.Router();
const AuthController = require('./../controllers/index').AuthController;

const ac = new AuthController();

//routes.use(ac.index);

routes.get('/login', ac.verifyLogin, ac.drawLogin);
routes.post('/login', ac.verifyLogin, ac.login);

routes.get('/register', ac.verifyLogin, ac.drawRegister);
routes.post('/register', ac.verifyLogin, ac.register);

routes.post('/logout', ac.logout);

module.exports = routes;