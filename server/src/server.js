// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const todoRoutes = require('./routes/todoRoutes');
const postRoutes = require('./routes/postsRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/posts', postRoutes); 

module.exports = app; // for Jest testing

