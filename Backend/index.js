// import packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// import modules
const connectDB = require('./Config/connectDB');
const Router = require('./Routes/Router');

// Initialize the server
const app = express();

// Database Connection
connectDB(process.env.DB_URL);

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable CORS for localhost:3000
app.use(express.json());  // For parsing JSON data
app.use(express.urlencoded({ extended: true }));  // For parsing URL-encoded data
app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser

// Handle routes
app.use(Router); // Use the router for handling routes

// Start the server
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})