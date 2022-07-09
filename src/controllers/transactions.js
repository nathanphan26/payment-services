const transactionsModel = require('../models/Transactions.js');
const usersModel = require('../models/users.js');

// GET ALL TRANSACTIONS
const getAllTransactionsForUser = (req, res) => {
    const { userId } = req.params;

    transactionsModel.getAllTransactions(userId)
        .then((results) => {
            res.send({success: true, data: results});
        }).catch((err) => {
            res.send({success: false, message: err});
        });
}

const sendPayment = (req, res) => {
    const { userId, userId2 } = req.params;
    const transaction = new transactionsModel({...req.body, from_user: userId, to_user: userId2});

    transactionsModel.sendPayment(transaction)
        .then((results) => {
            res.send({success: true, data: results});
        }).catch((err) => {
            res.send({success: false, message: err});
        });
}

module.exports = { getAllTransactionsForUser, sendPayment };