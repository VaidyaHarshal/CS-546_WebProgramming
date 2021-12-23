const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const data = require('../data');
const userData = data.users;

router.get('/', async (req, res) => {
    if (req.session.user) {
        return res.redirect('/private');
    } else {
        res.render('users/login', {title: "Login Form"});
    }
});

router.post('/login', async(req, res) => {
    let allUserData = req.body;

    if(!allUserData.username || typeof allUserData.username !== 'string' || !allUserData.username.trim().replace(/\s/g, "").length) {
        res.status(400).render('users/login', {hasErrors: true, error: "Please enter a valid Username", title: "Login"});
        return;
    }

    if(!allUserData.password || typeof allUserData.password !== 'string' || !allUserData.password.trim().replace(/\s/g, "").length) {
        res.status(400).render('users/login', {hasErrors: true, error: "Please enter a valid Password.", title: "Login"});
        return;
    }

    if(allUserData.username.trim().replace(/\s/g, "").length < 4) {
        res.status(400).render('users/login', {hasErrors: true, error: "Username cannot be less than 4 characters.", title: "Login"});
        return;
    }

    let userValidate = /^[a-zA-Z0-9]*$/gi;
    let passValidate = /^(?!.* ).{6,20}$/gi;
    let demoUsername = allUserData.username.trim().toLowerCase();

    if(!userValidate.test(demoUsername)) {
        res.status(400).render('users/login', {hasErrors: true, error: "Username does not contain only alphanumeric characters.", title: "Login"});
        return;
    }

    if(!passValidate.test(allUserData.password.trim())) {
        res.status(400).render('users/login', {hasErrors: true, error: "Password contains spaces or is less than 6 characters.", title: "Login"});
        return;
    }

    let listUsers;
    try {
        listUsers = await userData.checkUser(demoUsername, allUserData.password)
        if(listUsers.authenticated) {
            req.session.user = allUserData.username.trim();
            res.redirect('/private');
        }
    } catch(e) {
        if(e.statusCode) {
            res.status(400).render('users/login', {hasErrors: true, error: e.message, title: "Login"});
            return;    
        } else {
            res.status(400).render('users/login', {hasErrors: true, error: "Either the username or password is invalid.", title: "Login"});
            return;
        }
    }
})

router.get('/signup', async (req, res) => {
    if (req.session.user) {
        return res.redirect('/private');
    } else {
    res.render('users/signup', {title: "Signup Form"});
    }
});

router.post('/signup', async(req, res) => {
    let allUserData = req.body;

    if(!allUserData.username || typeof allUserData.username !== 'string' || !allUserData.username.trim().replace(/\s/g, "").length) {
        res.status(400).render('users/signup', {hasErrors: true, error: "Entered username is invalid.", title: "Signup"});
        return;
    }

    if(!allUserData.password || typeof allUserData.password !== 'string' || !allUserData.password.trim().replace(/\s/g, "").length) {
        res.status(400).render('users/signup', {hasErrors: true, error: "Entered password is invalid.", title: "Signup"});
        return;
    }

    if(allUserData.username.trim().replace(/\s/g, "").length < 4) {
        res.status(400).render('users/signup', {hasErrors: true, error: "Username cannot be less than 4 characters.", title: "Signup"});
        return;
    }

    let userValidate = /^[a-zA-Z0-9]*$/gi;
    let passValidate = /^(?!.* ).{6,20}$/gi;
    allUserData.username = allUserData.username.trim().toLowerCase();

    if(!userValidate.test(allUserData.username)) {
        res.status(400).render('users/signup', {hasErrors: true, error: "Username should contain only alphanumeric characters.", title: "Signup"});
        return;
    }

    if(!passValidate.test(allUserData.password.trim())) {
        res.status(400).render('users/signup', {hasErrors: true, error: "Password contains spaces or is less than 6 characters.", title: "Signup"});
        return;
    }

    let listUsers;
    try {
        listUsers = await userData.createUser(allUserData.username, allUserData.password)
        if(listUsers.userInserted)
            res.redirect('/');
    } catch(e) {
        if(e.statusCode) {
            res.status(400).render('users/signup', {hasErrors: true, error: e.message, title: "Signup"});
            return;
        } else {
            res.status(400).render('users/signup', {hasErrors: true, error: "You did not provide a valid username and/or password.", title: "Signup"});
            return;
        }
    }
})

router.get('/private', async(req, res) => {
    res.render('users/private', {title: `Hi ${req.session.user}`});
})

router.get('/logout', async(req, res) => {
    if (!req.session.user) {
        return res.status(403).render('users/private', {hasErrors: true, error: "User is not logged in, please login."});
    } else {
        req.session.destroy();
        res.render('users/logout', {title: "Logout"});
    }
})

module.exports = router;