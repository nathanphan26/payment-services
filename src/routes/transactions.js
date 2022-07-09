const express = require('express');
const router = express.Router({mergeParams: true});

const { getAllTransactionsForUser, sendPayment, requestPayment } = require('../controllers/transactions.js');

// GET ALL TRANSACTIONS FOR A USER
router.get('/', getAllTransactionsForUser);

router.post('/send/:userId2', sendPayment);

// router.post('/request/:userId2', requestPayment);


module.exports = router;