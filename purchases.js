const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (pool) => {
    router.get('/all', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM purchases', (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({purchases: results});
        }
        });
    });

    router.get('/:idstock/:idcus/:idpay', (req, res) => {
        // Retrieve the customer data from the database
        pool.query('SELECT * FROM purchases WHERE idstock= ? AND idcustomer= ? AND idpayment= ?',(req.params.idstock,req.params.idcus,req.params.idpay), (error, results) => {
        if (error) {
            // There was an error executing the SQL query
            res.status(500).send('An error occurred');
        } else {
            // The query was successful, send the result back to the client
            res.send({purchases: results});
        }
        });
    });
    
    router.post('/add', (req, res) => {
        const { idstock, idcustomer, idpayment, qauntity, date } = req.body;
        const sql = `INSERT INTO purchases (idstock, idcustomer, idpayment, qauntity, date) VALUES (?, ?, ?, ?, ?)`;
        const values = [idstock, idcustomer, idpayment, qauntity, date];
        pool.query(sql, values, (error, results) => {
            if (error) {
            res.status(500).json({ error });
            } else {
            res.json({ results });
            }
        });
        });
    
    router.delete('/:idcustomer/:idpayment/:idstock', (req, res) => {
        const { idcustomer,idpayment,idstock } = req.params;
        const sql = `DELETE FROM purchases WHERE idcustomer = ? AND idpayment=? AND idstock= ?`;
        const values = [idcustomer,idpayment,idstock];
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
