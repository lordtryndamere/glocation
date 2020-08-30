const router = require('express').Router();
const pointofsalesController = require('../controllers/pointofsales.controller');



router.post('/',pointofsalesController.createpointofsales);
router.get('/:id',pointofsalesController.getpointofsale);
router.get('/',pointofsalesController.getAllpointofsales);
router.put('/:id',pointofsalesController.upadatepointofsales);
router.delete('/:id',pointofsalesController.deletepointofsales);

module.exports = router;
