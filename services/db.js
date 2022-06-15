const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();

const devConfig = `postgresql://${process.env.POOL_USER}:${process.env.POOL_PASSWORD}@${process.env.POOL_HOST}:${process.env.POOL_PORT}/${process.env.POOL_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

module.exports = pool;
