// controllers/ambienteController.js
const db = require('../db');

const getAllAmbientes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ambiente');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const getAmbienteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM ambiente WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const createAmbiente = async (req, res) => {
  const { nombre, descripcion, capacidad, habilitado, tipo_ambiente_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO ambiente (nombre, descripcion, capacidad, habilitado, tipo_ambiente_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, descripcion, capacidad, habilitado, tipo_ambiente_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data into the database');
  }
};

const updateAmbiente = async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, capacidad, habilitado, tipo_ambiente_id } = req.body;
  try {
    const result = await db.query(
      'UPDATE ambiente SET nombre = $1, descripcion = $2, capacidad = $3, habilitado = $4, tipo_ambiente_id = $5 WHERE id = $6 RETURNING *',
      [nombre, descripcion, capacidad, habilitado, tipo_ambiente_id, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data in the database');
  }
};

const deleteAmbiente = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM ambiente WHERE id = $1', [id]);
    res.json({ message: 'Ambiente deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data from the database');
  }
};

module.exports = {
  getAllAmbientes,
  getAmbienteById,
  createAmbiente,
  updateAmbiente,
  deleteAmbiente,
};
