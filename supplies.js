const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (pool) => {
    router.get('/all', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM supplies', (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({purchases : results.map(res => ({...res, ...{"combId": res.idstock + "/" + res.idsupplier}}))});
        }
        });
    });
    router.get('/:stocid/:suppid', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM supplies WHERE idstock= ? AND idsupplier= ?', [req.params.stocid, req.params.suppid], (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send(error);
            // res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({purchase: results[0]});
        }
        });
    });
    
    router.post('/add', (req, res) => {
        const { quantity,deliveryDate,payment,idstock,idsupplier } = req.body;
        console.log(req.body)
        const sql = `INSERT INTO supplies (quantity, deliveryDate, payment, idstock, idsupplier) VALUES (?, ?, ?, ?, ?)`;
        const values = [quantity, deliveryDate, payment, idstock, idsupplier];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ purchases:results });
            }
        });
        });
    
    router.get('/delete/:stocid/:suppid', (req, res) => {
        const { stocid,suppid } = req.params;
        const sql = `DELETE FROM supplies WHERE idstock = ? AND idsupplier=?`;
        const values = [stocid, suppid];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ purchases:results });
            }
        });
    });

    return router;
}
