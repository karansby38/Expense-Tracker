const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const {db}=require('./db/db');
const {readdirSync}=require('fs');
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route)))


// Server function
const server = () => {
  db(); // Call the db function to connect to the database
  app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
  });
};

server();
