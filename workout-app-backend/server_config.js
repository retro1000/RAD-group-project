import express, { json } from 'express';
import cors from 'cors';
import { connect, connection as _connection } from 'mongoose';
import bodyParse from 'body-parser';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const reactPort = process.env.REACT_PORT || 3000;

app.use(cors());
app.use(json());

const uri = process.env.ATLAS_URI;
connect(uri, {useNewUrlParser:true});

const connection = _connection;
connection.once('open', () => {
    console.log('Database connected successfully');
});

app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/bodyParts', require('./routes/body_part'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});