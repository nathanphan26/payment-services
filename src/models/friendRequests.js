const conn = require('../../config/database.js');

const FriendRequest = function(friendRequest) {
    this.from_user = friendRequest.from_user;
    this.to_user = friendRequest.to_user;
    this.accepted = 0;
    this.timestamp = new Date();
}

FriendRequest.getRequestsForUser = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query(`
            SELECT * 
                FROM friend_requests 
                WHERE to_user=?
        `, userId, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

FriendRequest.getRequestForUserById = (userId, requestId) => {
    return new Promise((resolve, reject) => {
        conn.query(`
            SELECT * 
                FROM friend_requests 
                WHERE id=?
        `, requestId, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

FriendRequest.sendRequestForUser = (friendRequestData) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO friend_requests SET ?`, friendRequestData, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

FriendRequest.acceptRequestForUser = (userId, requestId) => {
    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) reject(err);

            conn.query(`UPDATE friend_requests SET accepted=1 WHERE id=?`, requestId, (err, results) => {
                if (err) conn.rollback(() => reject(err));

                conn.query(`INSERT INTO friends (user1, user2) SELECT ${userId} AS user1, from_user FROM friend_requests WHERE id=${requestId}`, (err, results) => {
                    if (err) conn.rollback(() => reject(err));
                    
                    conn.commit((err) => {
                        if (err) conn.rollback(() => reject(err));
                        
                        console.log('FRIEND REQUEST UPDATED & FRIEND RECORD CREATED');

                        resolve(results);
                    });
                });
            });
        });
    });
}

FriendRequest.findExistingRequestByUsers = (from_user, to_user) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM friend_requests WHERE from_user=? AND to_user=?', [from_user, to_user], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

FriendRequest.findExistingRequestById = (requestId) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM friend_requests WHERE id=?', requestId, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

module.exports = FriendRequest;