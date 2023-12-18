// routes/ambienteFacilidadRoutes.js
const express = require('express');
const ambienteFacilidadController = require('../controllers/ambienteFacilidadController');

const router = express.Router();

router.get('/ambiente-facilidades', ambienteFacilidadController.getAllAmbienteFacilidades);
router.get('/ambiente-facilidades/:id', ambienteFacilidadController.getAmbienteFacilidadById);
router.post('/ambiente-facilidades', ambienteFacilidadController.createAmbienteFacilidad);
router.put('/ambiente-facilidades/:id', ambienteFacilidadController.updateAmbienteFacilidad);
router.delete('/ambiente-facilidades/:id', ambienteFacilidadController.deleteAmbienteFacilidad);

module.exports = router;