const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds027425.mlab.com:27425/todo-app');

const todoSchema = new mongoose.Schema({
    item: String
});
const todo = mongoose.model('To-do', todoSchema);

/*
let data = [
    { item: 'Buy milk.' },
    { item: 'Walk dog.' },
    { item: 'Finish project.' }
];
*/

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = app => {
    app.get('/todo', (req, res) => {
        todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });
    app.post('/todo', urlencodedParser, (req, res) => {
        let newTodo =  todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item', (req, res) => {
        todo.find({item: req.params.item.replace(/-/g, ' ')}).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
};