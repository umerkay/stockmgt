const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (pool) => {
    router.get('/all', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM payment', (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({payment : results});
        }
        });
    });
    router.get('/:id', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM payment WHERE idpayment= ?', [req.params.id], (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send(error);
            // res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({payment : results});
        }
        });
    });
    
    router.post('/add', (req, res) => {
        const { amount,status,idcustomer } = req.body;
        const sql = `INSERT INTO payment (amount, status, idcustomer) VALUES (?, ?, ?)`;
        const values = [amount,status,idcustomer];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ payment:results });
            }
        });
        });
    
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM payment WHERE idpayment= ?`;
        const values = [id];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ payment:results });
            }
        });
    });

    return router;
}
