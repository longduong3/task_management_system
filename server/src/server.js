import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
const { connectDB } = require('./config/connectDB');
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
