const router = require('express').Router();
const inventaryController = require('../controllers/inventary.controller');
const isLogged = require('../../services/isLogged'); //MIDDLEWARE QUE SE ENCARGA DE VALIDAD SI ESTA LOGEADO
const replica = require('../../services/authValidation') //MIDLLEWARE PARA VALIDAR EL ROL Y EL PERMISO A LA RUTA



router.post('/',isLogged,replica.grantAccess('createAny','inventary'),inventaryController.createinventary);
router.get('/:id',isLogged,replica.grantAccess('readAny','inventary'),inventaryController.getinventary);
router.get('/',isLogged,replica.grantAccess('readAny','inventary'),inventaryController.getAllinventaries);
router.get('/porpuntodeventa/:puntodeventa',isLogged,replica.grantAccess('readAny','inventary'),inventaryController.getinventaryByPointOfSale)
router.put('/:id',isLogged,replica.grantAccess('updateAny','inventary'),inventaryController.upadateinventary);
router.delete('/:id',isLogged,replica.grantAccess('deleteAny','inventary'),inventaryController.deleteinventary);

module.exports = router;
