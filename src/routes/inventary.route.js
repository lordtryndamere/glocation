const router = require('express').Router();
const inventaryController = require('../controllers/inventary.controller');
const isLogged = require('../../services/isLogged');



router.post('/',inventaryController.createinventary);
router.get('/:id',inventaryController.getinventary);
router.get('/',inventaryController.getAllinventaries);
router.get('/porpuntodeventa/:puntodeventa',inventaryController.getinventaryByPointOfSale)
router.put('/:id',inventaryController.upadateinventary);
router.delete('/:id',inventaryController.deleteinventary);

module.exports = router;
