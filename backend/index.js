var fs = require('fs');
var express = require('express');
var queries = require('./queries');
var cors = require('cors');
require('dotenv').config()

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.post('/setPreferences', queries.setPreferences);

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
  })