const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'payment_service'
});

conn.connect((err) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log('Database Connected Successfully...'); 
});

module.exports = conn;