const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const isLogged = require('../../services/isLogged');
const replica = require('../../services/authValidation')



router.post('/',isLogged,replica.grantAccess('createAny','category'),categoryController.createcategory);
router.get('/:id',isLogged,replica.grantAccess('readAny','category'),categoryController.getcategory);
router.get('/',isLogged,replica.grantAccess('readAny','category'),categoryController.getAllcategories);
router.put('/:id',isLogged,replica.grantAccess('updateAny','category'),categoryController.upadatecategory);
router.delete('/:id',isLogged,replica.grantAccess('deleteAny','category'),categoryController.deletecategory);

module.exports = router;
