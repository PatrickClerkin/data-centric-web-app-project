const mysql = require('mysql2/promise');

const connectMySQL = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root', 
        database: 'proj2024mysql', 
    });
    return connection;
};

module.exports = connectMySQL;
