const userModel = require('../models/users.js');

// GET ALL USERS
const getUsers = (req, res) => {
    const getAllUsersPromise = userModel.getAllUsers();
    getAllUsersPromise.then((results) => {
        res.send(results);
    }).catch((err) => {
        res.send({success: false, message: err});
    });    
}

// CREATE USER
const createUser = (req, res) => {
    const user = new userModel(req.body);
    if (!req.body.first_name || !req.body.last_name || !req.body.username) {
        res.send({success: false, message: "Please fill in all fields"});
    } else {
        const createUserPromise = userModel.createUser(user);
        createUserPromise.then((results) => {
            res.send({success: true, message: 'User Created Successfully', id: results.insertId});
        }).catch((err) => {
            res.send({success: false, message: err});
        });
    }
}

// GET USER BY ID
const getUserById = (req, res) => {
    const { id } = req.params;
    const getUserByIdPromise = userModel.getUserById(id);

    getUserByIdPromise.then((results) => {
        res.send(results);
    }).catch((err) => {
        res.send({success: false, message: err});
    });
}

// UPDATE USER BY ID
const updateUserById = (req, res) => {
    const { id } = req.params;
    const updateUserByIdPromise = userModel.updateUserById(id, req.body);

    updateUserByIdPromise.then((results) => {
        res.send({success: true, message: 'User Updated Successfully', data: results})
    }).catch((err) => {
        res.send({success: false, message: err});
    });
}

// DELETE USER BY ID
const deleteUserById = (req, res) => {
    const { id } = req.params;
    const deleteUserByIdPromise = userModel.deleteUserById(id);

    deleteUserByIdPromise.then((results) => {
        res.send({success: true, message: 'User Deleted Successfully', data: results})
    }).catch((err) => {
        res.send({success: false, message: err});
    });
}

module.exports = { getUsers, createUser, getUserById, updateUserById, deleteUserById };  