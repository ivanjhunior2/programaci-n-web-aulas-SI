const pool = require('../db').pool;

const getAllReservas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reserva');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener todas las reservas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getReservaById = async (req, res) => {
  const reservaId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM reserva WHERE id = $1', [reservaId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Reserva no encontrada' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error al obtener reserva por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createReserva = async (req, res) => {
  const { fecha, ambiente_id, hora_inicio, hora_fin, estado } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO reserva (fecha, ambiente_id, hora_inicio, hora_fin, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fecha, ambiente_id, hora_inicio, hora_fin, estado]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateReserva = async (req, res) => {
  const reservaId = req.params.id;
  const { fecha, ambiente_id, hora_inicio, hora_fin, estado } = req.body;

  try {
    const result = await pool.query(
      'UPDATE reserva SET fecha = $1, ambiente_id = $2, hora_inicio = $3, hora_fin = $4, estado = $5 WHERE id = $6 RETURNING *',
      [fecha, ambiente_id, hora_inicio, hora_fin, estado, reservaId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteReserva = async (req, res) => {
  const reservaId = req.params.id;

  try {
    await pool.query('DELETE FROM reserva WHERE id = $1', [reservaId]);
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
};
