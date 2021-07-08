const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post("/", function (req, res) {
    var sql = "SELECT * FROM user WHERE email = '" + req.body.email + "'"; 
    connection.query( sql,
        function(err, results, fields) {
            bcrypt.compare(req.body.password, results[0].password, function(err, result) {
                if (result == true) {
                    var token = jwt.sign({ id: results[0].id }, process.env.SECRET, {
                        expiresIn: 86400
                    });
                    res.status(200).send({ token: token });
                } else {
                    res.status(400).json({
                        msg: 'Invalid Credentials',
                    });
                }
            });
            
        }
    );
});

module.exports = router;