// controllers/ambienteFacilidadController.js
const db = require('../db');

const getAllAmbienteFacilidades = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ambiente_facilidad');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const getAmbienteFacilidadById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM ambiente_facilidad WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
  
};

const createAmbienteFacilidad = async (req, res) => {
  const { ambiente_id, facilidad_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO ambiente_facilidad (ambiente_id, facilidad_id) VALUES ($1, $2) RETURNING *',
      [ambiente_id, facilidad_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data into the database');
  }
};

const updateAmbienteFacilidad = async (req, res) => {
  const id = req.params.id;
  const { ambiente_id, facilidad_id } = req.body;
  try {
    const result = await db.query(
      'UPDATE ambiente_facilidad SET ambiente_id = $1, facilidad_id = $2 WHERE id = $3 RETURNING *',
      [ambiente_id, facilidad_id, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data in the database');
  }
};

const deleteAmbienteFacilidad = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM ambiente_facilidad WHERE id = $1', [id]);
    res.json({ message: 'Ambiente-Facilidad relationship deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data from the database');
  }
};

module.exports = {
  getAllAmbienteFacilidades,
  getAmbienteFacilidadById,
  createAmbienteFacilidad,
  updateAmbienteFacilidad,
  deleteAmbienteFacilidad,
};
