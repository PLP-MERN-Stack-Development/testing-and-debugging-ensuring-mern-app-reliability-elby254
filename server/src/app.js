const express = require('express');
const cors = require('cors');

const todoRoutes = require('./routes/todoRoutes');
const postRoutes = require('./routes/postsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;

