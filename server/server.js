const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'bloguser',
    password: process.env.DB_PASS,
    database: 'blog-app',
    port: 3306,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.json(`YOU'RE A KING!!!!!`);
});

app.post('/adduser', (req, res) => {
    const newUser = req.body;
    const sql = `INSERT INTO blogusers (userName, userPassword, userEmailAddress) VALUES (?, ?, ?)`;
    db.query(
        sql,
        [newUser.userName, newUser.userPassword, newUser.userEmailAddress],
        (err, data) => {
            if (err) throw err;
            res.json(data);
        }
    );
});

app.listen(1234, function (err) {
    if (err) {
        return console.error(err);
    }

    console.log('Started at http://localhost:1234');
});
