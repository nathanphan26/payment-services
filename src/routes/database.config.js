const express = require('express');
const router = express.Router();
const conn = require('../../config/database.js');

router.post('/createDB', (req, res) => {
    const createDBPromise = new Promise((resolve, reject) => {
        conn.query('CREATE DATABASE payment_service', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });

    createDBPromise
        .then((results) => {
            res.send({success: true, data: results});
        }).catch((err) => {
            res.send({success: false, message: err});
        });
});

router.post('/createTables', (req, res) => {
    const createTablesPromimse = new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) reject(err);

            // CREATE USERS TABLE
            conn.query(`
                CREATE TABLE users(
                    id int AUTO_INCREMENT, 
                    first_name varchar(255), 
                    last_name varchar(255), 
                    username varchar(255), 
                    balance decimal(13,4), 
                    PRIMARY KEY (id)
                )
            `, (err, results) => {
                if (err) conn.rollback(() => reject(err));
                
                // CREATE FRIEND REQUESTS TABLE
                conn.query(`
                    CREATE TABLE friend_requests(
                        id int AUTO_INCREMENT, 
                        from_user int, 
                        to_user int, 
                        timestamp datetime, 
                        accepted boolean, 
                        FOREIGN KEY (from_user) REFERENCES Users(id), 
                        FOREIGN KEY (to_user) REFERENCES Users(id), 
                        PRIMARY KEY (id)
                    )
                `, (err, results) => {
                    if (err) conn.rollback(() => reject(err));
                    
                    // CREATE FRIENDS TABLE
                    conn.query(`
                        CREATE TABLE friends(
                            id int AUTO_INCREMENT, 
                            user1 int, 
                            user2 int, 
                            FOREIGN KEY (user1) REFERENCES Users(id), 
                            FOREIGN KEY (user2) REFERENCES Users(id), 
                            PRIMARY KEY (id)
                        )
                    `, (err, results) => {
                        if (err) conn.rollback(() => reject(err));
                        
                        // CREATE TRANSACTIONS TABLE
                        conn.query(`
                            CREATE TABLE transactions(
                                id int AUTO_INCREMENT, 
                                from_user int, 
                                to_user int, 
                                amount decimal(13,4), 
                                isPublic boolean, 
                                timestamp datetime, 
                                FOREIGN KEY (from_user) REFERENCES Users(id), 
                                FOREIGN KEY (to_user) REFERENCES Users(id), 
                                PRIMARY KEY (id)
                            )
                        `, (err, results) => {
                            if (err) conn.rollback(() => reject(err));
                           
                            conn.commit((err) => {
                                if (err) conn.rollback(() => reject(err));
                                
                                console.log('ALL TABLES CREATED');
        
                                resolve(results);
                            });
                        });
                    });
                });
            });
        });
    });

    createTablesPromimse
        .then((results) => {
            res.send({success: true, data: results});
        }).catch((err) => {
            res.send({success: false, message: err});
        });
});

module.exports = router;