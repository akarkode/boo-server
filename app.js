const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');
const voteRoutes = require('./routes/votes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/profiles', profileRoutes.api);
app.use('/api/votes', voteRoutes);
app.use('/profiles', profileRoutes.pages);

module.exports = app;
