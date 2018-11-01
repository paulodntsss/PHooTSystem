const mysql = require('mysql');

const connection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'web1234',
        database: 'Test'
    });
}

module.exports = () => connection;