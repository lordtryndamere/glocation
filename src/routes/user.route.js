const router = require('express').Router();
const userController = require('../controllers/user.controller');
const isLogged = require('../../services/isLogged');
const replica = require('../../services/authValidation')


router.post('/login',userController.login);
router.post('/',userController.register);
router.get('/:id',isLogged,replica.grantAccess('readAny', 'profile'),userController.getUser);
router.get('/',isLogged,replica.grantAccess('readAny', 'profile'),userController.getUsers);
router.put('/:id',isLogged,replica.grantAccess('updateAny', 'profile'),userController.upadateUser);
router.delete('/:id',isLogged,replica.grantAccess('deleteAny', 'profile'),userController.deleteUser);

module.exports = router;
