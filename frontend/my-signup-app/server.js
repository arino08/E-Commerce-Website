const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key', // Replace with a secure key in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

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

// API endpoint to handle signup form submission
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';

    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error checking user in database.');
            return;
        }

        if (results.length > 0) {
            res.status(409).send('User already exists.');
        } else {
            db.query(insertQuery, [email, password], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).send('Error saving user to database.');
                    return;
                }
                res.status(200).send('User saved successfully.');
            });
        }
    });
});

// API endpoint to handle login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error logging in.');
            return;
        }

        if (results.length > 0) {
            req.session.user = results[0];
            res.status(200).send('Login successful.');
        } else {
            res.status(401).send('Invalid email or password.');
        }
    });
});

// API endpoint to handle logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error logging out.');
            return;
        }
        res.status(200).send('Logout successful.');
    });
});

// API endpoint to fetch products
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching products.');
            return;
        }
        res.status(200).json(results);
    });
});

// API endpoint to add item to cart
app.post('/cart', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const { product_id, quantity } = req.body;
    const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';

    db.query(query, [req.session.user.id, product_id, quantity], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error adding item to cart.');
            return;
        }
        res.status(200).send('Item added to cart successfully.');
    });
});

// API endpoint to update item quantity in cart
app.put('/cart/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const { id } = req.params;
    const { quantity } = req.body;
    const query = 'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?';

    db.query(query, [quantity, id, req.session.user.id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error updating item quantity in cart.');
            return;
        }
        res.status(200).send('Item quantity updated successfully.');
    });
});

// API endpoint to view cart
app.get('/cart', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const query = `
        SELECT cart.id, products.name, products.description, products.price, products.image_url, cart.quantity
        FROM cart
        JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(query, [req.session.user.id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching cart.');
            return;
        }
        res.status(200).json(results);
    });
});

// API endpoint to remove item from cart
app.delete('/cart/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const { id } = req.params;
    const query = 'DELETE FROM cart WHERE id = ? AND user_id = ?';

    db.query(query, [id, req.session.user.id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error removing item from cart.');
            return;
        }
        res.status(200).send('Item removed from cart successfully.');
    });
});

// API endpoint to handle checkout
app.post('/checkout', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const query = 'DELETE FROM cart WHERE user_id = ?';

    db.query(query, [req.session.user.id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error checking out.');
            return;
        }
        res.status(200).send('Items checked out.');
    });
});

// Route to serve the signup.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route to serve the login.html file
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route to serve the products.html file
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

// Route to serve the shopping-cart.html file
app.get('/shopping-cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shopping-cart.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});