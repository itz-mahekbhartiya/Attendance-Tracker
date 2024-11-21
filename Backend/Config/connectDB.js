const mongoose = require('mongoose');

function connectDB(URL){
mongoose.connect(URL)
.then(()=>console.log('Database connected successfully'))
.catch((error)=>console.log('Failed to connect database',error));
}

module.exports = connectDB;