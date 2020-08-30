const router = require('express').Router();
const factureController = require('../controllers/facture.controller');
const isLogged = require('../../services/isLogged');
const replica = require('../../services/authValidation');



router.post('/',isLogged,replica.grantAccess('createAny','facture'),factureController.createfacture);
router.get('/:id',isLogged,replica.grantAccess('readAny','facture'),factureController.getfacture);
router.get('/',isLogged,replica.grantAccess('readAny','facture'),factureController.getAllfacturies);
router.put('/:id',isLogged,replica.grantAccess('updateAny','facture'),factureController.upadatefacture);
router.delete('/:id',isLogged,replica.grantAccess('deleteAny','facture'),factureController.deletefacture);

module.exports = router;
