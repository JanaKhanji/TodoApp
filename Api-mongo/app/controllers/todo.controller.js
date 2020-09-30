const Todo = require('../models/todo.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "todo title can not be empty"
        });
    }
    // Create a Todo
    const todo = new Todo({
        title: req.body.title, 
        completed : req.body.completed,
        editing : req.body.editing || false 
    });

    // Save Todo in the database
    todo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Todo.find()
    .then(todos => {
        res.send(todos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Todo Title can not be empty"
        });
    }

    // Find todo and update it with the request body
    Todo.findByIdAndUpdate(req.params.todoID, {
        title: req.body.title, 
        completed : req.body.completed,
        editing : req.body.editing || false 
    }, {new: true})
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoID
            });
        }
        res.send(todo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoID
            });                
        }
        return res.status(500).send({
            message: "Error updating Todo with id " + req.params.todoID
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.todoID)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoID
            });
        }
        res.send({message: "Todo deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoID
            });                
        }
        return res.status(500).send({
            message: "Could not delete Todo with id " + req.params.todoID
        });
    });
};
