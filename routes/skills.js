const express = require('express');
const Skill = require('../models/skill');
const router = express.Router();

// Add Skill
router.get('/add', isLoggedIn, (req, res) => {
    res.render('skill');
});

router.post('/add', isLoggedIn, async (req, res) => {
    try {
        const newSkill = new Skill({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            author: req.user._id
        });
        await newSkill.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error adding skill');
    }
});

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
