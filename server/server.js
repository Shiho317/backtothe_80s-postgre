const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./router/router');
const mysql = require('mysql')
const bodyparser = require('body-parser')

dotenv.config();
app.use(express())
app.use(cors())
app.use(bodyparser.json())

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/', router)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('server is running: ' + PORT))