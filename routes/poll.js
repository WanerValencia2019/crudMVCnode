const express = require('express');
const routes = express.Router();
const PollController = require('../controllers/index').PollController;

const pc = new PollController();

//routes.use(dbConnection);
routes.get('/', pc.getAll);
routes.post('/eliminar', pc.delete);

routes.get('/crear', pc.drawForm);

routes.post('/crear', pc.save);

routes.get('/editar/:id', pc.getOne);

routes.post('/editar', pc.save);

module.exports = routes;