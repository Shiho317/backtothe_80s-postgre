const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors())

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('server is running: ' + PORT))