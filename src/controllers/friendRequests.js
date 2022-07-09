const friendRequestsModel = require('../models/friendRequests.js');

const friendRequestUtils = require('../utils/friendRequestUtils.js');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseUtils.js');

// GET PENDING OUTGOING FRIEND REQUESTS
const getRequestsForUser = (req, res) => {
    const { userId } = req.params;

    // get all requests for this user
    friendRequestsModel.getRequestsForUser(userId)
        .then((results) => sendSuccessResponse(res, null, results, 200))
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

const getRequestForUserById = (req, res) => {
    const { userId, requestId } = req.params;
    
    // Check Prior Request
    friendRequestUtils.findExistingRequestById(requestId)
        .then((results) => {
            // Check if Request Exists
            if (results.length === 0) {
                sendErrorResponse(res, 'Request does not exist...', null, 400);
                return;
            }
            // Check permissions
            if (results[0].to_user !== userId) {
                sendErrorResponse(res, 'You do not have permission for this request...', null, 400);
                return;
            }

            // Get Request
            friendRequestsModel.getRequestForUserById(userId, requestId)
                .then((results) => sendSuccessResponse(res, null, results, 200))
                .catch((err) => sendErrorResponse(res, err, null, 400));
        })
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

const sendRequestForUser = (req, res) => {
    const { userId } = req.params;
    const { body } = req;

    // Check Fields
    if (!body.to_user) {
        sendErrorResponse(res, 'Recepient Required...', null, 400);
        return;
    }

    // Check Prior Requests
    friendRequestUtils.findExistingRequestByUsers(userId, body.to_user)
        .then((results) => {
            // Check if Request Already Exists
            if (results.length > 0) {
                // Check if Request Has Been Accepted
                if (results[0].accepted == 1) sendErrorResponse(res, 'You are already friends with this user...', null, 400);
                if (results[0].accepted == 0) sendErrorResponse(res, 'You are already have a pending request with this user...', null, 400);
                return;
            }

            // Create Request
            const friendRequest = new friendRequestsModel({...body, from_user: userId});
            friendRequestsModel.sendRequestForUser(friendRequest)
                .then((results) => sendSuccessResponse(res, 'Friend Request Sent...', results, 200))
                .catch((err) => sendErrorResponse(res, err, null, 400));
        })
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

const acceptRequestForUser = (req, res) => {
    const { userId, requestId } = req.params;

    // Check Prior Request
    friendRequestUtils.findExistingRequestById(requestId)
        .then((results) => {
            // Check if Request Exists
            if (results.length === 0) {
                sendErrorResponse(res, 'Request does not exist...', null, 400);
                return;
            }
            // Check if Request Already Accepted
            if (results[0].accepted) {
                sendErrorResponse(res, 'Request already accepted...', null, 400);
                return;
            }
            // Check permissions
            if (results[0].to_user !== userId) {
                sendErrorResponse(res, 'You do not have permission for this request...', null, 400);
                return;
            }

            // Accept Request
            friendRequestsModel.acceptRequestForUser(parseInt(userId), parseInt(requestId))
                .then((results) => sendSuccessResponse(res, 'Friend Request Accepted...', results, 200))
                .catch((err) => sendErrorResponse(res, err, null, 400));
        })
        .catch((err) => sendErrorResponse(res, err, null, 400));
}


module.exports = { getRequestsForUser, getRequestForUserById, sendRequestForUser, acceptRequestForUser }  