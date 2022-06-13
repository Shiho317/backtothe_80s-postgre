const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  user: 'root',
  host: process.env.SQL_HOST,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
})

db.connect(err => {
  if(err){
    console.log(err)
  }else{
    console.log('connected')
  }
})

module.exports = db;