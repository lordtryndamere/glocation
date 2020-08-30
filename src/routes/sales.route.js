const router = require('express').Router();
const salesController = require('../controllers/sales.controller');
const isLogged = require('../../services/isLogged');
const replica = require('../../services/authValidation');



router.post('/',isLogged,replica.grantAccess('createAny','sales'),salesController.createSale);
router.get('/',isLogged,replica.grantAccess('readAny','sales'),salesController.getAllSales);
router.get('/:id',isLogged,replica.grantAccess('readAny','sales'),salesController.getSale);
router.get('/perpointofsale/:puntodeventa',isLogged,replica.grantAccess('readAny','sales'),salesController.getSaleByPointOfSale);
router.put('/:id',isLogged,replica.grantAccess('updateAny','sales'),salesController.upadateSale);
router.delete('/:id',isLogged,replica.grantAccess('deleteAny','sales'),salesController.deleteSale);


module.exports = router;
