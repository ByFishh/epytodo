const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
    var sql =  "SELECT * FROM todo";
    connection.query(sql,
        function(err, results, fields) {
            res.status(200).send(results);
        }
    );
});

router.get("/:format", function (req, res) {
    var format = req.params.format;
    var sql =  "SELECT * FROM todo WHERE id = '" + format + "'";
    connection.query(sql,
        function(err, results, fields) {
            if (results != 0)
                res.send(results[0]);
        }
    );
    res.status(200).send({ msg: "Not found" });
});

router.post("/", function (req, res) {
    var sql = "INSERT INTO todo (title, description, due_time, user_id, status) VALUES ?";
    var values = [
        [req.body.title, req.body.description, req.body.due_time, req.body.user_id, req.body.status]
    ];
    connection.query(sql, [values]);
    sql = "SELECT * FROM todo WHERE user_id = '" + req.body.user_id + "'";
    connection.query(sql,
        function(err, results, fields) {
            res.status(200).send(results[0]);
        }
    );
});

router.put("/:id", function (req, res) {
    var id = req.params.id;
    var sql = "UPDATE todo SET title = '" + req.body.title + "', description = '" + req.body.description + "', due_time = '" + req.body.due_time + "', user_id = '" + req.body.user_id + "', status = '" + req.body.status + "' WHERE id = '" + id + "'";
    connection.query(sql);
    var sql = "SELECT * FROM todo WHERE id = '" + id + "'";
    connection.query(sql,
        function(err, results, fields) {
            res.status(200).send(results[0]);
        }
    )
});

router.delete("/:id", function (req, res) {
    var id = req.params.id;
    var sql = "DELETE FROM todo WHERE id = '" + id + "'";
    connection.query(sql,
        function(err, results, fields) {
            res.status(200).json({
                msg: 'succesfully deleted record number : ' + id,
            });
        }
    )
});

module.exports = router;