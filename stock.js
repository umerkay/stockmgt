const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (pool) => {
    router.get('/all', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM stock', (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({products: results});
        }
        });
    });

    router.patch('/', (req, res) => {
        const { name, priceperunit, quantity, idstock } = req.body;
        const updateQuery = `
        UPDATE stock
        SET name = ?, priceperunit = ?, quantity = ?
        WHERE idstock = ?
        `;

        const values = [name, priceperunit, quantity, idstock];

        pool.query(updateQuery, values, (error, results) => {
        if (error) {
            console.log(error)
            return res.status(500).json({
            error: 'Error updating supplier in database'
            });
        }
        // respond with updated supplier data
        res.json({
            name, priceperunit, quantity
        });
        });
    });

    router.get('/:id', (req, res) => {
        // Retrieve the stock data from the database
        pool.query('SELECT * FROM stock WHERE idstock = ?', [req.params.id], (error, results) => {
          if (error) {
            // There was an error executing the SQL query
            res.status(500).send('An error occurred');
          } else {
            // The query was successful, send the result back to the client
            res.send({ product: results[0] });
          }
        });
      });
      
    
    router.post('/add', (req, res) => {
        const { idstock, name, quantity,priceperunit } = req.body;
        const sql = `INSERT INTO stock (idstock, name, quantity,priceperunit) VALUES (?, ?, ?,?)`;
        const values = [idstock,name,quantity,priceperunit];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ products:results });
            }
        });
        });
    
    router.delete('/:idstock', (req, res) => {
        const { idstock } = req.params;
        const sql = `DELETE FROM stock WHERE idstock = ?`;
        const values = [idstock];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ products:results });
            }
        });
    });

    return router;
}
