const conn = require('../../config/database.js');

const Friend = function(friend) {
    this.user1 = friend.user1;
    this.user2 = friend.user2;
}

// GET ALL FRIENDS
Friend.getFriendsForUser = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT user2 FROM friends WHERE user1=?', userId, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

module.exports = Friend;