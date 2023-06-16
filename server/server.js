const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const intialilizePassport = require('./passport-config');
require('dotenv').config();

const app = express();

intialilizePassport(passport, username => {
    // TODO: check sql db for matching username
});

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
    // TODO: generate random string for this, longer is better
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUnitialized: false
}));
app.use(passport.session());

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

app.post('/adduser', async (req, res) => {
    const newUser = req.body;
    const hashedPassword = await bcrypt.hash(newUser.userPassword, 10);
    const sql = `INSERT INTO blogusers (userName, userPassword, userEmailAddress) VALUES (?, ?, ?)`;
    db.query(
        sql,
        [newUser.userName, hashedPassword, newUser.userEmailAddress],
        (err, data) => {
            if (err) throw err;
            res.json(data);
        }
    );

    console.log('Data successfully added to db')
});

//TODO: create FE ability to edit/delete users
// app.put('/edituser', (req, res) => {
//     const user = req.body;
//     const sql =
//         'UPDATE blogusers SET userName = ?, userPassword = ?, userEmailAddress = ?  WHERE id = ?';
//     db.query(sql, [user.userName, user.userPassword, user.userEmailAddress, user.id], (err, data) => {
//         if (err) {
//             throw err;
//         }
//         res.json(data);
//     });
// });

// app.delete('/deleteuser', (req, res) => {
//     const user = req.body;
//     const sql = 'DELETE FROM blogusers WHERE id = ?';
//     db.query(sql, [user.id], (err, data) => {
//         if (err) {
//             throw err;
//         }
//         res.json(data);
//     });
// });

app.get('/login', async (req, res) => {
    res.json("let's login dude!");
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.listen(1234, function (err) {
    if (err) {
        return console.error(err);
    }

    console.log('Started at http://localhost:1234');
});
