const router = require('express').Router();
const factureController = require('../controllers/facture.controller');



router.post('/',factureController.createfacture);
router.get('/:id',factureController.getfacture);
router.get('/',factureController.getAllfacturies);
router.put('/:id',factureController.upadatefacture);
router.delete('/:id',factureController.deletefacture);

module.exports = router;
