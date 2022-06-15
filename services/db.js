const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.POOL_USER,
  password: process.env.POOL_PASSWORD,
  host: process.env.POOL_HOST,
  port: process.env.POOL_PORT,
  database: process.env.POOL_DATABASE
});

module.exports = pool;