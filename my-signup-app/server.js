const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ariz0812',
    database: 'ecommerce'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// API endpoint to handle form submission
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            res.status(500).send('Error saving user to database.');
            return;
        }
        res.status(200).send('User saved successfully.');
    });
});

// Route to serve the signup.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});