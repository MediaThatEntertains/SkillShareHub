const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
   
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Skill', SkillSchema);
