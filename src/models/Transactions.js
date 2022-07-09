const conn = require('../../config/database.js');

const Transaction = function(transaction) {
    this.from_user = transaction.from_user;
    this.to_user = transaction.to_user;
    this.amount = transaction.amount;
    this.isPublic = transaction.isPublic;
    this.timestamp = new Date();
}

Transaction.getAllTransactions = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM transactions WHERE from_user=${userId} OR to_user=${userId}`, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

Transaction.sendPayment = (transactionData) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO transactions SET ?', transactionData, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

module.exports = Transaction;