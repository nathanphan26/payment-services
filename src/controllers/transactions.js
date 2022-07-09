const transactionsModel = require('../models/Transactions.js');

const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseUtils.js');

// GET ALL TRANSACTIONS
const getAllTransactionsForUser = (req, res) => {
    const { userId } = req.params;

    transactionsModel.getAllTransactions(userId)
        .then((results) => sendSuccessResponse(res, null, results, 200))
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

const sendPayment = (req, res) => {
    const { userId, userId2 } = req.params;
    const transaction = new transactionsModel({...req.body, from_user: userId, to_user: userId2});

    transactionsModel.sendPayment(transaction)
        .then((results) => sendSuccessResponse(res, 'Payment Sent...', results, 200))
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

module.exports = { getAllTransactionsForUser, sendPayment };