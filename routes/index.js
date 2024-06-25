const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');

// Home Page
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().populate('author');
        res.render('index', { skills: skills });
    } catch (err) {
        res.status(500).send('Error fetching skills');
    }
});

module.exports = router;
