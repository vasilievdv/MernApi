const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const checkAuth = require('../middlewares/checkAuth');

const usersRouter = Router();

usersRouter.get('/people/:id', checkAuth, usersController.getAllUsers);
usersRouter.route('/:id').patch(checkAuth, usersController.editUser);

module.exports = usersRouter;
