const router = require('express').Router();
const productController = require('../controllers/product.controller');
const isLogged = require('../../services/isLogged'); //MIDDLEWARE QUE SE ENCARGA DE VALIDAD SI ESTA LOGEADO
const replica = require('../../services/authValidation') //MIDLLEWARE PARA VALIDAR EL ROL Y EL PERMISO A LA RUTA



router.post('/',isLogged,replica.grantAccess('createAny','product'),productController.createproduct);
router.get('/:id',isLogged,replica.grantAccess('readAny','product'),productController.getproduct);
router.get('/',isLogged,replica.grantAccess('readAny','product'),productController.getAllproduct);
router.get('/bycategorie/:categoria',isLogged,replica.grantAccess('readAny','product'),productController.getproductsByCategorie)
router.put('/:id',isLogged,replica.grantAccess('updateAny','product'),productController.upadateproduct);
router.delete('/:id',isLogged,replica.grantAccess('deleteAny','product'),productController.deleteproduct);

module.exports = router;
