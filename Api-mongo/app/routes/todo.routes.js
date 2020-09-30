module.exports = (app) => {
    const todos = require('../controllers/todo.controller.js');

    // Create a new todo
    app.post('/todos', todos.create);

    // Retrieve all todos
    app.get('/todos', todos.findAll);

    // Update a todo with todoID
    app.put('/todos/:todoID', todos.update);

    // Delete a todo with todoID
    app.delete('/todos/:todoID', todos.delete);
}