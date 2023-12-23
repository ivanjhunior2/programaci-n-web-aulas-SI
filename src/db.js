const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: '123456789',
    host:'Localhost',
    port: 5432,
    database: 'reservacursos'
});

module.exports = pool;