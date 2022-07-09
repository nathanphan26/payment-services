const friendsModel = require('../models/Friends.js');

// GET ALL FRIENDS
const getFriendsForUser = (req, res) => {
    const { userId } = req.params;

    friendsModel.getFriendsForUser(userId)
        .then((results) => {
            res.send({success: true, data: results});
        })
        .catch((err) => {
            res.send({success: false, message: err});
        });
}


module.exports = { getFriendsForUser };