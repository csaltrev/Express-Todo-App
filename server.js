const express = require('express');
const todos = require('./controllers/todos.js');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

todos(app);

app.listen(3000);
console.log('Listening on port 3000...');