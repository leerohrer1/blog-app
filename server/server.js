const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const config = require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'blog-app',
    port: 1234,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.json('good');
});

app.post('/adduser', (req, res) => {
    const newUser = req.body;
    const sql = `INSERT INTO blog-app.blogusers (userName, userPassword, userEmail) VAULUES (?, ?, ?)`;
    db.query(
        sql,
        [newUser.user, newUser.userPassword, newUser.userEmail],
        (err, data) => {
            if (err) throw err;
            res.json(data);
        }
    );
});

app.listen(1234);
