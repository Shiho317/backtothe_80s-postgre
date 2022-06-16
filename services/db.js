const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();

const devConfig = `postgresql://${process.env.POOL_USER}:${process.env.POOL_PASSWORD}@${process.env.POOL_HOST}:${process.env.POOL_PORT}/${process.env.POOL_DATABASE}`;

// const pool = new Pool({
//   user: process.env.POOL_USER,
//   password: process.env.POOL_PASSWORD,
//   host: process.env.POOL_HOST,
//   port: process.env.POOL_PORT,
//   database: process.env.POOL_DATABASE
// })

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
