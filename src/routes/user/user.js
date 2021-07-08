const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
    var sql =  "SELECT * FROM user";
    connection.query(sql,
        function(err, results, fields) {
            res.status(200).send(results);
        }
    );
});

router.get("/todos", function (req, res) {
    var sql =  "SELECT * FROM todo";
    connection.query(sql,
        function(err, results, fields) {
            res.status(200).send(results);
        }
    );
});

router.get("/:format", function (req, res) {
    var format = req.params.format;
    var sql =  "SELECT * FROM user WHERE id = '" + format + "'";
    connection.query(sql,
        function(err, results, fields) {
            if (results != 0)
                res.status(200).send(results[0]);
        }
    );
    sql =  "SELECT * FROM user WHERE email = '" + format + "'";
    connection.query(sql,
        function(err, results, fields) {
            if (results != 0)
                res.status(200).send(results[0]);
        }
    );
    res.status(400).send({ msg: "Not found" });
});

router.put("/:id", function (req, res) {
    var id = req.params.id;
    var sql = "UPDATE user SET email = '" + req.body.email + "', password = '" + req.body.password + "', firstname = '" + req.body.firstname + "', name = '" + req.body.name + "' WHERE id = '" + id + "'";
    connection.query(sql);
    sql = "SELECT * FROM user WHERE id = '" + id + "'";
    connection.query(sql,
        function(err, results, fields) {
            res.status(200).send(results[0]);
        }
    )
});

router.delete("/:id", function (req, res) {
    var id = req.params.id;
    var sql = "DELETE FROM user WHERE id = '" + id + "'";
    connection.query(sql,
        function(err, results, fields) {
            res.status(200).json({
                msg: 'succesfully deleted record number : ' + id,
            });
        }
    )
});

module.exports = router;