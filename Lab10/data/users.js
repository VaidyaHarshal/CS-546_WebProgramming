const express = require('express');
const router = express.Router();
const data = require('../data');
const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 16;

let exportedMethods = {
    async createUser(username, password) {
        if(!username || !password) {
            throw {statusCode: 400, message: 'You must provide a valid username or password'};
        }

        if(typeof username !== 'string' || typeof password !== 'string') {
            throw {statusCode: 400, message: 'You must provide string values in the inputs'};
        }

        if(!username.trim().replace(/\s/g, "").length || !password.trim().replace(/\s/g, "").length) {
            throw {statusCode: 400, message: 'Only empty spaces in the strings are not allowed'};
        }

        if(username.trim().replace(/\s/g, "").length < 4) {
            throw {statusCode: 400, message: 'Username is less than 4 characters which is not allowed'};
        }

        let userValidate = /^[a-zA-Z0-9]*$/gi;
        let passValidate = /^(?!.* ).{6,20}$/gi
        username = username.trim().toLowerCase();
        let userAuth = {userInserted: false};

        if(!userValidate.test(username)) {
            throw {statusCode: 400, message: 'The username does not contain only alphanumeric values'};
        }

        if(!passValidate.test(password.trim())) {
            throw {statusCode: 400, message: 'The password contains spaces or is less than 6 characters'};
        }

        const userCollection = await users();
        const duplicateUser = await userCollection.findOne({username: username});

        if(duplicateUser !== null)
            throw {statusCode: 400, message: 'Username already exists'};

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let newUser = {
            username: username,
            password: hashedPassword
        };

        const insertUser = await userCollection.insertOne(newUser);
        if(insertUser.insertedCount === 0)
            throw {statusCode: 500, message: 'Internal Server Error'};

        userAuth.userInserted = true;
        return userAuth;
    },

    async checkUser(username, password) {
        if(!username || !password) {
            throw {statusCode: 400, message: 'You must provide a valid username or password'};
        }

        if(typeof username !== 'string' || typeof password !== 'string') {
            throw {statusCode: 400, message: 'You must provide string values in the inputs'};
        }

        if(!username.trim().replace(/\s/g, "").length || !password.trim().replace(/\s/g, "").length) {
            throw {statusCode: 400, message: 'Only empty spaces in the strings are not allowed'};
        }

        if(username.trim().replace(/\s/g, "").length < 4) {
            throw {statusCode: 400, message: 'Username is less tha 4 characters which is not allowed'};
        }

        let userValidate = /^[a-zA-Z0-9]*$/gi;
        let passValidate = /^(?!.* ).{6,20}$/gi
        username = username.trim().toLowerCase();
        let userAuth = {authenticated: false};

        if(!userValidate.test(username)) {
            throw {statusCode: 400, message: 'The username does not contain only alphanumeric values'};
        }

        if(!passValidate.test(password.trim())) {
            throw {statusCode: 400, message: 'The password contains spaces or is less than 6 characters'};
        }

        const userCollection = await users();
        const duplicateUser = await userCollection.findOne({username: username});

        if(duplicateUser === null) {
            throw {statusCode: 400, message: 'Either the username or password is invalid'};
        }

        let passCompare = await bcrypt.compare(password, duplicateUser.password);

        if(passCompare) {
            userAuth.authenticated = true;
        } else {
            throw {statusCode: 400, message: 'Either the username or password is invalid'};
        }
        return userAuth;
    }
}

module.exports = exportedMethods;