const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Registration
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const newUser = new User({ username: req.body.username });
        await User.register(newUser, req.body.password);
        res.redirect('/users/login');
    } catch (err) {
        res.status(500).send('Error registering new user');
    }
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
