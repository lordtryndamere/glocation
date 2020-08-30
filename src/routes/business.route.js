const router = require('express').Router();
const businessController = require('../controllers/business.controller');
const isLogged = require('../../services/isLogged');



router.post('/',businessController.createBusiness);
router.get('/:id',businessController.getBusiness);
router.get('/',businessController.getAllBusiness);
router.put('/:id',businessController.upadateBusiness);
router.delete('/:id',businessController.deleteBusiness);

module.exports = router;
