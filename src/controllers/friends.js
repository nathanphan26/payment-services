const friendsModel = require('../models/Friends.js');

const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseUtils.js');

// GET ALL FRIENDS FOR USER
const getFriendsForUser = (req, res) => {
    const { userId } = req.params;

    friendsModel.getFriendsForUser(userId)
        .then((results) => sendSuccessResponse(res, null, results, 200))
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

module.exports = { getFriendsForUser };