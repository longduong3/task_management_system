import express from 'express';
const cors = require('cors');
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine.js';
import initAPIRoute from "./route/api";
const { connectDB } = require('./config/connectDB');
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up view engine
configViewEngine(app);

// Initialize API routes
initAPIRoute(app);

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
