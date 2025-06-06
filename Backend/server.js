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
const PORT = process.env.PORT || 8000;
// Database Connection
connectDB(process.env.DB_URL);
console.log(`Database connected successfully at ${process.env.DB_URL}`);

// Middleware
app.use(cors({ origin: 'https://attendance-tracker-frontend-i659.onrender.com', credentials: true })); // Enable CORS for localhost:3000
app.use(express.json());  // For parsing JSON data
app.use(express.urlencoded({ extended: true }));  // For parsing URL-encoded data
app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser

// Handle routes
app.use(Router); // Use the router for handling routes

// Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})