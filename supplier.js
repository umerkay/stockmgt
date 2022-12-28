const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (pool) => {

    router.get('/all', (req, res) => {
    // Retrieve the supplier data from the database
    pool.query('SELECT * FROM supplier', (error, results) => {
        if (error) {
        // There was an error executing the SQL query
        res.status(500).send('An error occurred');
        } else {
        // The query was successful, send the result back to the client
        res.send(results);
        }
    });
    });

    router.post('/add', (req, res) => {
    const { name, address } = req.body;
    const sql = `INSERT INTO supplier (name, address) VALUES (?, ?)`;
    const values = [name, address];
    pool.query(sql, values, (error, results) => {
        if (error) {
        res.status(500).json({ error });
        } else {
        res.json({ results });
        }
    });
    });

    router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM supplier WHERE idsupplier = ?`;
    const values = [id];
    pool.query(sql, values, (error, results) => {
        if (error) {
        res.status(500).json({ error });
        } else {
        res.json({ results });
        }
    });
    });

    return router;
}
