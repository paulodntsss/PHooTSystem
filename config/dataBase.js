const mysql = require('mysql');

const connection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'Test'
    });
}

module.exports = () => connection;