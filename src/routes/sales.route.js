const router = require('express').Router();
const salesController = require('../controllers/sales.controller');
const isLogged = require('../../services/isLogged');



router.post('/crearventa',salesController.createSale);


module.exports = router;
