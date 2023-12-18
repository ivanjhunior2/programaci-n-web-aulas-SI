// ambienteRoutes.js
const express = require('express');
const ambienteController = require('../controllers/ambienteController');

const router = express.Router();


router.get('/ambientes', ambienteController.getAllAmbientes);
router.get('/ambientes/:id', ambienteController.getAmbienteById);
router.post('/ambientes', ambienteController.createAmbiente);
router.put('/ambientes/:id', ambienteController.updateAmbiente);
router.delete('/ambientes/:id', ambienteController.deleteAmbiente);

module.exports = router;
