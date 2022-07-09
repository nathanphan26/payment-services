const { addFriendship } = require('./friends.js');

const friendRequestsModel = require('../models/friendRequests.js');
const friendRequestUtils = require('../utils/friendRequestUtils.js');

// GET PENDING OUTGOING FRIEND REQUESTS
const getRequestsForUser = (req, res) => {
    const { userId } = req.params;

    // get all requests for this user
    friendRequestsModel.getRequestsForUser(userId)
        .then((results) => {
            res.send({success: true, data: results});
        }).catch((err) => {
            res.send({success: false, message: err});
        });
}

const getRequestForUserById = (req, res) => {
    const { userId, requestId } = req.params;
    
    // Check Prior Request
    friendRequestUtils.findExistingRequestById(requestId)
        .then((results) => {
            // Check if Request Exists
            if (results.length === 0) {
                res.send({success: false, message: 'Request does not exist...'});
                return;
            }
            // Check permissions
            if (results[0].to_user !== userId) {
                res.send({success: false, message: 'You do not have permission for this request...'});
                return;
            }

            // Get Request
            friendRequestsModel.getRequestForUserById(userId, requestId)
                .then((results) => {
                    res.send({success: true, data: results});
                }).catch((err) => {
                    res.send({success: false, message: err});
                });
        })
        .catch((err) => {
            res.send({success: false, message: err});
        });
}

const sendRequestForUser = (req, res) => {
    const { userId } = req.params;
    const { body } = req;

    // Check Fields
    if (!body.to_user) res.send({success: false, message: 'Required fields missing...'});

    // Check Prior Requests
    friendRequestUtils.findExistingRequestByUsers(userId, body.to_user)
        .then((results) => {
            // Check if Request Already Exists
            if (results.length > 0) {
                // Check if Request Has Been Accepted
                if (results[0].accepted == 1) res.send({success: false, message: 'You are already friends with this user...'});
                if (results[0].accepted == 0) res.send({success: false, message: 'You are already have a pending request with this user...'});
                return;
            }

            // Create Request
            const friendRequest = new friendRequestsModel({...body, from_user: userId});
            friendRequestsModel.sendRequestForUser(friendRequest)
                .then((results) => {
                    res.send({success: true, data: results});
                }).catch((err) => {
                    res.send({success: false, message: err});
                });
        })
        .catch((err) => {
            res.send({success: false, message: err});
        });
}

const acceptRequestForUser = (req, res) => {
    const { userId, requestId } = req.params;

    // Check Prior Request
    friendRequestUtils.findExistingRequestById(requestId)
        .then((results) => {
            // Check if Request Exists
            if (results.length === 0) {
                res.send({success: false, message: 'Request does not exist...'});
                return;
            }
            // Check if Request Already Accepted
            if (results[0].accepted) {
                res.send({success: false, message: 'Request already accepted...'});
                return;
            }
            // Check permissions
            if (results[0].to_user !== userId) {
                res.send({success: false, message: 'You do not have permission for this request...'});
                return;
            }

            // Accept Request
            friendRequestsModel.acceptRequestForUser(parseInt(userId), parseInt(requestId))
                .then((results) => {
                    res.send({success: true, data: results});
                }).catch((err) => {
                    res.send({success: false, message: err});
                });
        })
        .catch((err) => {
            res.send({success: false, message: err});
        });
}


module.exports = { getRequestsForUser, getRequestForUserById, sendRequestForUser, acceptRequestForUser }  