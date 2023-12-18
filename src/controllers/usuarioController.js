// controllers/usuarioController.js
const db = require('../db');

const getAllUsuarios = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const getUsuarioById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const createUsuario = async (req, res) => {
  const { nombre, contrasena, email, telefono } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO usuario (nombre, contrasena, email, telefono) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, contrasena, email, telefono]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data into the database');
  }
};

const updateUsuario = async (req, res) => {
  const id = req.params.id;
  const { nombre, contrasena, email, telefono } = req.body;
  try {
    const result = await db.query(
      'UPDATE usuario SET nombre = $1, contrasena = $2, email = $3, telefono = $4 WHERE id = $5 RETURNING *',
      [nombre, contrasena, email, telefono, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data in the database');
  }
};

const deleteUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM usuario WHERE id = $1', [id]);
    res.json({ message: 'Usuario deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data from the database');
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
