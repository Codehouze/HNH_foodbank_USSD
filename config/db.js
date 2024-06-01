const dotenv = require('dotenv')
const mongoose = require('mongoose');

const{DB_URL} = process.env;

  
mongoose.connect(DB_URL)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});
  

module.exports = db;