const express = require('express');
const routes = express.Router();
const PollController = require('../controllers/index').PollController;
const AuthController = require('./../controllers/index').AuthController;

const ac = new AuthController();

const pc = new PollController();

//routes.use(dbConnection);
routes.get('/', ac.loginRequired, pc.getAll);
routes.post('/eliminar', ac.loginRequired, pc.delete);

routes.get('/crear', ac.loginRequired, pc.drawForm);

routes.post('/crear', ac.loginRequired, pc.save);

routes.get('/editar/:id', ac.loginRequired, pc.getOne);

routes.post('/editar', ac.loginRequired, pc.save);

module.exports = routes;