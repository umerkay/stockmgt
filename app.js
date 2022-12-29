const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const customer = require('./customer.js');
const supplier = require('./supplier.js');

const app = express();
app.use(bodyParser.json());

// Set up a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stockmgt'
});

app.use('/api/v1/customer', customer(pool));
app.use('/api/v1/supplier', supplier(pool));

app.listen(2022, () => {
  console.log('API server listening on port 2022');
});