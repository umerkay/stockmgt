const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (pool) => {
    router.get('/all', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM customer', (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({suppliers: results});
        }
        });
    });

    router.get('/:id', (req, res) => {
        // Retrieve the customer data from the database
        let {id} = req.params
        pool.query('SELECT * FROM customer WHERE idcustomer = ?', [id], (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            console.log(error)
            res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({supplier: results[0]});
        }
        });
    });
    
    router.post('/add', (req, res) => {
        const { name, address, is_defaulter } = req.body;
        const sql = `INSERT INTO customer (name, address, is_defaulter) VALUES (?, ?, 0)`;
        const values = [name, address];
        pool.query(sql, values, (error, results) => {
            if (error) {
                console.log(error)
            res.status(500).json({ error });
            } else {

            res.json({ suppliers: results });
            }
        });
        });
    
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM customer WHERE idcustomer = ?`;
        const values = [id];
        pool.query(sql, values, (error, results) => {
            if (error) {
                console.log(error)
            res.status(500).json({ error });
            } else {
                console.log(results)
            res.json({ suppliers: results });
            }
        });
    });

    return router;
}
