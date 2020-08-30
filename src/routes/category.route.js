const router = require('express').Router();
const categoryController = require('../controllers/category.controller');



router.post('/',categoryController.createcategory);
router.get('/:id',categoryController.getcategory);
router.get('/',categoryController.getAllcategories);
router.put('/:id',categoryController.upadatecategory);
router.delete('/:id',categoryController.deletecategory);

module.exports = router;
