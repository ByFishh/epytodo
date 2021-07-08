const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).send({ msg: "Token is not valid" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send({ msg: "No token , authorization denied" });
    }
};