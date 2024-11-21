const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    FullName : { type: String, required: true},
    EmpId : { type: String, required: true},
    Gender: {type: String, required: true},
    Address: {type: String, required: true},
    Password : { type: String, required: true},
},{timestamps:true});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = {Admin};