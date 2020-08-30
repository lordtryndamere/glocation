const router = require('express').Router();
const productController = require('../controllers/product.controller');
const isLogged = require('../../services/isLogged');



router.post('/',productController.createproduct);
router.get('/:id',productController.getproduct);
router.get('/',productController.getAllproduct);
router.get('/bycategorie/:categoria',productController.getproductsByCategorie)
router.put('/:id',productController.upadateproduct);
router.delete('/:id',productController.deleteproduct);

module.exports = router;
