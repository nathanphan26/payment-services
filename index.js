const express = require('express');
const databaseConfigRoutes = require('./src/routes/database.config.js');
const userRoutes = require('./src/routes/users.js');
const friendRequestRoutes = require('./src/routes/friendRequests.js');
const friendRoutes = require('./src/routes/friends.js');
const transactionRoutes = require('./src/routes/transactions.js');

const app = express();

app.use(express.json());

app.get('/', () => console.log('homepage'));

// /users
app.use('/users', userRoutes);

// Database
app.use('/db', databaseConfigRoutes);

// /users/:userId/friendRequests
userRoutes.use('/:userId/friendRequests', friendRequestRoutes);

// /users/:userId/friends
userRoutes.use('/:userId/friends', friendRoutes);

// /users/:userId/transactions
userRoutes.use('/:userId/transactions', transactionRoutes);

const HOST = 'http://localhost';
const PORT = '5555';

app.listen(PORT, () => console.log(`Server connected on ${HOST}:${PORT}`)); 