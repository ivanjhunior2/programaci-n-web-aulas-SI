// routes/usuarioRoutes.js
const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.get('/usuarios', usuarioController.getAllUsuarios);
router.get('/usuarios/:id', usuarioController.getUsuarioById);
router.post('/usuarios', usuarioController.createUsuario);
router.put('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.deleteUsuario);

module.exports = router;
