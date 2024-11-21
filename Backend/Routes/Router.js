const express = require('express');
const Router = express.Router();
const { loginEmployee, loginAdmin } = require('../Controller/coreController');
const { checkIn, checkOut } = require('../Controller/userController');
const {getEmployees, getEmployeeById} = require('../Controller/adminController')
// Define routes
Router.post('/loginEmployee', loginEmployee);
Router.post('/loginAdmin', loginAdmin);
Router.post('/checkIn', checkIn)
Router.post('/checkOut', checkOut)
Router.get('/employees',getEmployees)
Router.get('/employee/:id/attendance', getEmployeeById);
module.exports = Router;
