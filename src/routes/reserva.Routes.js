// routes/reservaRoutes.js
const express = require('express');
const reservaController = require('../controllers/reservaController');

const router = express.Router();

router.get('/reservas', reservaController.getAllReservas);
router.get('/reservas/:id', reservaController.getReservaById);
router.post('/reservas', reservaController.createReserva);
router.put('/reservas/:id', reservaController.updateReserva);
router.delete('/reservas/:id', reservaController.deleteReserva);

module.exports = router;
