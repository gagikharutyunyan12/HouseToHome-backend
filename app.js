const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler')
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/api/v1', userRoutes);

app.use(errorHandler);

module.exports = app;