const express = require('express');
const { getUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../controllers/users.js');

const router = express.Router();

// GET ALL USERS
router.get('/', getUsers);

// CREATE USER
router.post('/', createUser);

// GET USER BY ID
router.get('/:id', getUserById);

// UPDATE USER BY ID
router.patch('/:id', updateUserById)

// DELETE USER BY ID
router.delete('/:id', deleteUserById)

module.exports = router;