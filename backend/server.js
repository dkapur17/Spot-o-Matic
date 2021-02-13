const fs = require('fs');
const express = require('express');
const queries = require('./queries');
const cors = require('cors');

require('dotenv').config()

const PORT = 5000

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.post('/setPreferences', queries.setPreferences);
app.post('/getPreferences', queries.getPreferences);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});