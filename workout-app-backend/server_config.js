const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const reactPort = process.env.REACT_PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected successfully');
});

app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});