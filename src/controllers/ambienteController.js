// controllers/ambienteController.js
const db = require('../db');

const getAllAmbientes = async (req, res) => {
  try {
    const result = await db.query('SELECT a.id, a.nombre, a.descripcion, a.capacidad, a.habilitado, t.nombre as tipo FROM ambiente a INNER JOIN tipo_ambiente t ON a.tipo_ambiente_id = t.id');

    const ambienteFacilidadesPromises = result.rows.map(async (ambiente) => {
      const facilidadesQuery = await db.query('SELECT f.id, f.nombre FROM facilidad f INNER JOIN ambiente_facilidad af ON f.id = af.facilidad_id WHERE af.ambiente_id = $1', [ambiente.id]);
      ambiente.facilidades = facilidadesQuery.rows.reduce((acc, facilidad) => {
        acc[facilidad.id] = facilidad.nombre;
        return acc;
      }, {});
      return ambiente;
    });
    const ambientesConFacilidades = await Promise.all(ambienteFacilidadesPromises);

    res.json(ambientesConFacilidades);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const getAmbienteById = async (req, res) => {
  const id = req.params.id;

  try {
    // Verifica que el ID sea un número entero válido
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await db.query('SELECT a.id, a.nombre, a.descripcion, a.capacidad, a.habilitado, t.nombre as tipo FROM ambiente a INNER JOIN tipo_ambiente t ON a.tipo_ambiente_id = t.id WHERE a.id = $1', [id]);

    // Verifica si se encontró un ambiente con el ID proporcionado
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ambiente not found' });
    }

    const ambiente = result.rows[0];

    // Obtén las facilidades del ambiente
    const facilidadesQuery = await db.query('SELECT f.id, f.nombre FROM facilidad f INNER JOIN ambiente_facilidad af ON f.id = af.facilidad_id WHERE af.ambiente_id = $1', [id]);
    ambiente.facilidades = facilidadesQuery.rows.reduce((acc, facilidad) => {
      acc[facilidad.id] = facilidad.nombre;
      return acc;
    }, {});

    res.json(ambiente);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database');
  }
};

const createAmbiente = async (req, res) => {
  const { nombre, descripcion, capacidad, ambiente, facilidades } = req.body;
  const habilitado = true;

  try {
    const resultAmbiente = await db.query(
      'INSERT INTO ambiente (nombre, descripcion, capacidad, habilitado, tipo_ambiente_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [nombre, descripcion, capacidad, habilitado, ambiente]
    );
    
    const idAmbiente = resultAmbiente.rows[0].id;
    for (const facilidadId of facilidades) {
      await db.query(
        'INSERT INTO ambiente_facilidad (ambiente_id, facilidad_id) VALUES ($1, $2) RETURNING *',
        [idAmbiente, facilidadId]
      );
    }

    res.status(201).json({ message: 'Ambiente creado con éxito', id: idAmbiente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar datos en la base de datos', details: error.message });
  }
};

const updateAmbiente = async (req, res) => {
  const id = req.params.id;
  
  const { nombre, descripcion, capacidad, ambiente, facilidades} = req.body;
  try {
    //Actualizar la información principal del ambiente
    const updateResult = await db.query(
      'UPDATE ambiente SET nombre = $1, descripcion = $2, capacidad = $3, tipo_ambiente_id = $4 WHERE id = $5 RETURNING *',
      [nombre, descripcion, capacidad, ambiente, id]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ message: 'Ambiente not found' });
    }

    //Eliminar todas las facilidades asociadas al ambiente
    await db.query('DELETE FROM ambiente_facilidad WHERE ambiente_id = $1', [id]);

    //Insertar las nuevas facilidades asociadas al ambiente
    await Promise.all(facilidades.map(async (facilidadId) => {
      await db.query('INSERT INTO ambiente_facilidad (ambiente_id, facilidad_id) VALUES ($1, $2)', [id, facilidadId]);
    }));

    res.json({ message: 'Ambiente updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data in the database');
  }
};

const deleteAmbiente = async (req, res) => {
  const id = req.params.id;

  try {
    await db.query('DELETE FROM ambiente_facilidad WHERE ambiente_id = $1', [id]);
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
