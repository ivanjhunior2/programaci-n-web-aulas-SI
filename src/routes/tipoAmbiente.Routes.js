// routes/tipoAmbienteRoutes.js
const express = require('express');
const tipoAmbienteController = require('../controllers/tipoAmbienteController');

const router = express.Router();

router.get('/tipos-ambiente', tipoAmbienteController.getAllTiposAmbiente);
router.get('/tipos-ambiente/:id', tipoAmbienteController.getTipoAmbienteById);
router.post('/tipos-ambiente', tipoAmbienteController.createTipoAmbiente);
router.put('/tipos-ambiente/:id', tipoAmbienteController.updateTipoAmbiente);
router.delete('/tipos-ambiente/:id', tipoAmbienteController.deleteTipoAmbiente);

module.exports = router;
