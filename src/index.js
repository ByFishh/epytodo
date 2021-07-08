const express = require("express")
const register = require("./routes/auth/auth")
const login = require("./routes/auth/login")
const user = require("./routes/user/user")
const todo = require("./routes/todos/todos")
const auth = require("./middleware/auth")
const app = express()
var bodyParser = require('body-parser')
const mysql = require("mysql2")
require('dotenv').config();

global.connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    port : 3306,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_ROOT_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

module.exports = connection;

app.use(bodyParser());

app.use("/register", register);
app.use("/login", login);
app.use("/user", auth, user);
app.use("/todo", auth, todo);

app.listen(3000);