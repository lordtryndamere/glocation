const router = require('express').Router();
const salesController = require('../controllers/sales.controller');
const isLogged = require('../../services/isLogged');



router.post('/',salesController.createSale);
router.get('/',salesController.getAllSales);
router.get('/:id',salesController.getSale);
router.get('/perpointofsale/:puntodeventa',salesController.getSaleByPointOfSale);
router.put('/:id',salesController.upadateSale);
router.delete('/:id',salesController.deleteSale);


module.exports = router;
