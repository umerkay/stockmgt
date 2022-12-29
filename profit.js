const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (pool) => {
    router.get('/all', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM profit', (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({profit : results});
        }
        });
    });
    router.get('/:stocid/:month', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM profit WHERE idstock= ? AND month=?', [req.params.stocid, req.params.month], (error, results) => {
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
        const { month,amount,idstock } = req.body;
        const sql = `INSERT INTO profit (month, amount, idstock) VALUES (?, ?, ?)`;
        const values = [month,amount,idstock];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ profit:results });
            }
        });
        });
    
    router.delete('/:stocid/:month', (req, res) => {
        const { stocid,month } = req.params;
        const sql = `DELETE FROM profit WHERE idstock= ? AND month=?`;
        const values = [stocid,month];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ profit:results });
            }
        });
    });

    return router;
}
