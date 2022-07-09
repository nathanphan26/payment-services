const friendRequestModel = require('../models/friendRequests.js');

const findExistingRequestByUsers = (from_user, to_user) => {
    // Check if there is row in friend_requests for both users
    return friendRequestModel.findExistingRequestByUsers(from_user, to_user)
        .then((results) => {
            return results;
        })
        .catch((err) => {
            throw err;
        });
}

const findExistingRequestById = (requestId) => {
    // Check if there is row in friend_requests for both users
    return friendRequestModel.findExistingRequestById(requestId)
        .then((results) => {
            return results;
        })
        .catch((err) => {
            throw err;
        });
}

module.exports = { findExistingRequestByUsers, findExistingRequestById }