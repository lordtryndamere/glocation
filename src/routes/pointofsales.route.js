const router = require('express').Router();
const pointofsalesController = require('../controllers/pointofsales.controller');
const isLogged = require('../../services/isLogged'); //MIDDLEWARE QUE SE ENCARGA DE VALIDAD SI ESTA LOGEADO
const replica = require('../../services/authValidation') //MIDLLEWARE PARA VALIDAR EL ROL Y EL PERMISO A LA RUTA


router.post('/',isLogged,replica.grantAccess('createAny','puntoventas'),pointofsalesController.createpointofsales);
router.get('/:id',isLogged,replica.grantAccess('readAny','puntoventas'),pointofsalesController.getpointofsale);
router.get('/',isLogged,replica.grantAccess('readAny','puntoventas'),pointofsalesController.getAllpointofsales);
router.get('/porciudad/:ciudad',isLogged,replica.grantAccess('readAny','puntoventas'),pointofsalesController.getAllpointofsalesperCity);
router.get('/por/distancia',isLogged,replica.grantAccess('readAny','puntoventas'),pointofsalesController.getpointsofsalesperdistance);
router.put('/:id',isLogged,replica.grantAccess('updateAny','puntoventas'),pointofsalesController.upadatepointofsales);
router.delete('/:id',isLogged,replica.grantAccess('deleteAny','puntoventas'),pointofsalesController.deletepointofsales);

module.exports = router;
