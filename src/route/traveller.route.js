const express = require('express');
const router  = express.Router();

const travellerController = require('./../controller/traveller.controller');
router.get('/:id',travellerController.getTraveller)
router.get('/',travellerController.getTraveller)
router.post('/',travellerController.addTraveller)
router.put('/:id',travellerController.updateTraveller)
router.delete('/:id',travellerController.deleteTraveller)
module.exports = router; 