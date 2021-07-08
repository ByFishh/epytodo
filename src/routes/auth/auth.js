const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post("/", function (req, res) {
    var email = req.body.email;
    var sql =  "SELECT * FROM user WHERE email = ?";
    var values = [[req.body.email]];
    connection.query(sql, [values],
        function(err, results, fields) {
            var tmp_id = results;
            if (results == 0) {
                var hashedPassword = bcrypt.hashSync(req.body.password, 8);
                sql = "INSERT INTO user (email, password, name, firstname) VALUES ?";
                values = [
                    [req.body.email, hashedPassword, req.body.name, req.body.firstname]
                ];
                connection.query(sql, [values], function(err, result) {
                    if (err) throw err;
                });
                var token = jwt.sign({ id: 8 }, process.env.SECRET, {
                    expiresIn: 86400
                });
                res.status(200).send({ token: token });
            } else {
                res.status(400).json({
                    msg: 'account already exists',
                });
            }
        }
    );
});

module.exports = router;