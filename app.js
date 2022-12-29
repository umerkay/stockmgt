const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const customer = require('./customer.js');
const supplier = require('./supplier.js');
const stock = require('./stock.js');
const supplies= require('./supplies.js');
const payment= require('./payment.js');
const purchases= require('./purchases.js');
const profit= require('./profit.js');


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
app.use('/stock', stock(pool));
app.use('/supplies',supplies(pool));
app.use('/payment',payment(pool));
app.use('/purchases', purchases(pool));
app.use('/profit',profit(pool));


app.listen(2022, () => {
  console.log('API server listening on port 2022');
});