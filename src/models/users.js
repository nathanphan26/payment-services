const conn = require('../../config/database.js');

const User = function(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.balance = user.balance|| 0;
}

// GET ALL USERS
User.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

// CREATE USER
User.createUser = (userReqData) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO users SET ? ', userReqData, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

// GET USER BY ID
User.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users WHERE id=?', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

// UPDATE USER BY ID
User.updateUserById = (id, userReqData) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE users SET ? WHERE id=${id}`, userReqData, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

// UPDATE SENDER BALANCE BY ID
User.updateSenderById = (id, amount) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE users SET balance = balance - ${amount} WHERE id=${id}`, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

// UPDATE RECEIVER BALANCE BY ID
User.updateReceiverById = (id, amount) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE users SET balance = balance + ${amount} WHERE id=${id}`, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

// DELETE USER BY ID
User.deleteUserById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM users WHERE id=?', id, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

module.exports = User;