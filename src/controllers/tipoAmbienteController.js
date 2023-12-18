// controllers/tipoAmbienteController.js
const db = require('../db');

const getAllTiposAmbiente = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tipo_ambiente');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const getTipoAmbienteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM tipo_ambiente WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const createTipoAmbiente = async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tipo_ambiente (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data into the database');
  }
};

const updateTipoAmbiente = async (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  try {
    const result = await db.query(
      'UPDATE tipo_ambiente SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data in the database');
  }
};

const deleteTipoAmbiente = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM tipo_ambiente WHERE id = $1', [id]);
    res.json({ message: 'Tipo de Ambiente deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data from the database');
  }
};

module.exports = {
  getAllTiposAmbiente,
  getTipoAmbienteById,
  createTipoAmbiente,
  updateTipoAmbiente,
  deleteTipoAmbiente,
};
