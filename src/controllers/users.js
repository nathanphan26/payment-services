const userModel = require('../models/users.js');

const { validateCreateUser } = require('../validators/usersValidator.js');

const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseUtils.js');


// GET ALL USERS
const getUsers = (req, res) => {
    userModel.getAllUsers()
        .then(results => sendSuccessResponse(res, null, results, 200))
        .catch(err => sendErrorResponse(res, err, null, 400));
}

// CREATE USER
const createUser = (req, res) => {
    const { body } = req;
    const [ isValid, errorMessage ] = validateCreateUser(body);

    if (!isValid) {
        sendErrorResponse(res, errorMessage, null, 400);
        return;
    }
    
    const user = new userModel(req.body);
    
    userModel.createUser(user)
        .then((results) => sendSuccessResponse(res, 'User Created Successfully...', results, 201))
        .catch((err) => sendErrorResponse(res, err, null, 400));
} 

// GET USER BY ID
const getUserById = (req, res) => {
    const { id } = req.params;

    userModel.getUserById(id)
        .then((results) => sendSuccessResponse(res, null, results, 200))
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

// UPDATE USER BY ID
const updateUserById = (req, res) => {
    const { id } = req.params;
    const message = 'User Updated Successfully';

    userModel.updateUserById(id, req.body)
        .then((results) => sendSuccessResponse(res, message, results, 200))
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

// DELETE USER BY ID
const deleteUserById = (req, res) => {
    const { id } = req.params;
    const message = 'User Deleted Successfully';

    userModel.deleteUserById(id)
        .then((results) => sendSuccessResponse(res, message, results, 200))
        .catch((err) => sendErrorResponse(res, err, null, 400));
}

module.exports = { getUsers, createUser, getUserById, updateUserById, deleteUserById };  