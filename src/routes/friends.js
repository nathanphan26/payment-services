const express = require('express');
const { getFriendsForUser } = require('../controllers/friends.js');

const router = express.Router({mergeParams: true});

router.get('/', getFriendsForUser);

module.exports = router;