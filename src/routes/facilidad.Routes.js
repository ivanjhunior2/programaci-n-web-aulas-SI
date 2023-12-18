// routes/facilidadRoutes.js
const express = require('express');
const facilidadController = require('../controllers/facilidadController');

const router = express.Router();

router.get('/facilidades', facilidadController.getAllFacilidades);
router.get('/facilidades/:id', facilidadController.getFacilidadById);
router.post('/facilidades', facilidadController.createFacilidad);
router.put('/facilidades/:id', facilidadController.updateFacilidad);
router.delete('/facilidades/:id', facilidadController.deleteFacilidad);

module.exports = router;
