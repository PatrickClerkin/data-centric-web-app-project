const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'proj2024mysql'
});

module.exports = pool;
