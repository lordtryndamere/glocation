const router = require('express').Router();
const userController = require('../controllers/user.controller');


router.post('/login',userController.login);
router.post('/',userController.register);
router.get('/:id',userController.getUser);
router.get('/',userController.getUsers);
router.put('/:id',userController.upadateUser);
router.delete('/:id',userController.deleteUser);

module.exports = router;
