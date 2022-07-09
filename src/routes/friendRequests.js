const express = require('express');
const { getRequestsForUser, getRequestForUserById, sendRequestForUser, acceptRequestForUser } = require('../controllers/friendRequests.js');

const router = express.Router({mergeParams: true});

// path = localhost/users/:userId/friendRequests
// get friend requests for a given user
router.get('/', getRequestsForUser);

// get info for a given friend request for a given user
router.get('/:requestId', getRequestForUserById);

router.post('/', sendRequestForUser)

// accepts friend request from a given friend for a given user
router.patch('/:requestId', acceptRequestForUser);

module.exports = router;