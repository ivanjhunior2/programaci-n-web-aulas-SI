// controllers/facilidadController.js
const db = require('../db');

const getAllFacilidades = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM facilidad');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const getFacilidadById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM facilidad WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const createFacilidad = async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO facilidad (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data into the database');
  }
};

const updateFacilidad = async (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  try {
    const result = await db.query(
      'UPDATE facilidad SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data in the database');
  }
};

const deleteFacilidad = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM facilidad WHERE id = $1', [id]);
    res.json({ message: 'Facilidad deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data from the database');
  }
};

module.exports = {
  getAllFacilidades,
  getFacilidadById,
  createFacilidad,
  updateFacilidad,
  deleteFacilidad,
};
