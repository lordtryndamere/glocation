const router = require('express').Router();
const businessController = require('../controllers/business.controller');
const isLogged = require('../../services/isLogged');
const replica = require('../../services/authValidation')



router.post('/',isLogged,replica.grantAccess('createAny','business'),businessController.createBusiness);
router.get('/:id',isLogged,replica.grantAccess('readOwn','business'),businessController.getBusiness);
router.get('/',isLogged,replica.grantAccess('readAny','business'),businessController.getAllBusiness);
router.put('/:id',isLogged,replica.grantAccess('updateAny','business'),businessController.upadateBusiness);
router.delete('/:id',isLogged,replica.grantAccess('deleteAny','business'),businessController.deleteBusiness);

module.exports = router;
