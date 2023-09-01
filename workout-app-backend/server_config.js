//1234 - Damitha ps

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import fs from 'fs';
// import https from 'https';
// import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import loginRoutes from './routes/login.js';
import signupRoutes from './routes/signup.js';
import bodyPartRoutes from './routes/body_part.js';
import exersiceRoutes from './routes/exersice.js';
import roleRoutes from './routes/role.js';
import workoutRoutes from './routes/workout.js';
import { UserQueries } from './queries/user.query.js';

dotenv.config();

const connection = mongoose.connection;

const port = process.env.PORT || 5000;
const reactPort = process.env.REACT_PORT || 3000;
const corsObject = {
    origin: `http:localhost:${reactPort}`,
    methods: 'GET, POST',
    credentials: true,
};

const app = express();

// const options = {
//     key: fs.readFileSync('path/to/private/key.pem'),
//     cert: fs.readFileSync('C:\\Windows\\System32\\workout-plans-web-app.cer'),
// };

app.use(cors(corsObject));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true});

connection.once('open', () => {
    console.log('Database connected successfully');
});

app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/bodyParts', bodyPartRoutes);
app.use('/exersice', exersiceRoutes);
app.use('/role', roleRoutes);
app.use('/workout', workoutRoutes);

// const server = https.createServer(options, app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});