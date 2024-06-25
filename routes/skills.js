const express = require('express');
const Skill = require('../models/skill');
const router = express.Router();

// Add Skill
router.get('/add', isLoggedIn, (req, res) => {
    res.sendFile('skill.html', { root: 'views' });
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

// API endpoint to fetch skills
router.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find().populate('author');
        res.json(skills);
    } catch (err) {
        res.status(500).send('Error fetching skills');
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
