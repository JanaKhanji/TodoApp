const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: String,
    completed: Boolean,
    editing: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);