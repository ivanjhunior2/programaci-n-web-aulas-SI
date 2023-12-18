const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'ivanaiza',
    host:'Localhost',
    port: 5432,
    database: 'reservacursos'
});

module.exports = pool;