const friendRequestUtils = require('../utils/friendRequestUtils.js');

// Key
// -1 = valid
//  0 = Request Does Not Exist
//  1 = User Does Not Have Access to Request
const validateGetRequestForUserById = (requestId, userId) => {
    requestId = parseInt(requestId);
    userId = parseInt(userId);

    return friendRequestUtils.findExistingRequestById(requestId)
        .then((results) => {
            if (results.length === 0) return 0;
            if (results[0].to_user !== userId) return 1;
            return -1;
        })
        .catch((err) => {
            return err;
        });
}

const validateSendRequestForUserFields = (body) => {
    return body.to_user ? true: false;
}

// Key
// -1 = valid
//  0 = already accepted
//  1 = still pending
const validateSendRequestForUser = (from_user, to_user) => {
    from_user = parseInt(from_user);
    to_user = parseInt(to_user);

    return friendRequestUtils.findExistingRequestByUsers(from_user, to_user)
        .then((results) => {
            // Check if Request Already Exists
            if (results.length > 0) {
                // Check if Request Has Been Accepted
                if (results[0].accepted == 1) return 0;
                if (results[0].accepted == 0) return 1;
                return -1;
            }
        })
        .catch((err) => {
            return err;
        })
}

// Key
// -1 = Valid
//  0 = Request Does Not Exist
//  1 = Request Already Accepted
//  2 = User Does Not Have Access to Request
const validateAcceptRequestForUser = (requestId, userId) => {
    requestId = parseInt(requestId);
    userId = parseInt(userId);

    return friendRequestUtils.findExistingRequestById(requestId)
        .then((results) => {
            if (results.length === 0) return 0;
            if (results[0].accepted) return 1;
            if (results[0].to_user !== userId) return 2;
            return -1;
        })
        .catch((err) => {
            return err;
        });
}

module.exports = { 
    validateGetRequestForUserById, 
    validateSendRequestForUserFields, 
    validateSendRequestForUser,
    validateAcceptRequestForUser 
};