# My Signup App

My Signup App is a simple e-commerce application that allows users to sign up, log in, view products, add items to their cart, and check out. The application is built using Node.js, Express, MySQL, and Bootstrap.

## Features

- User signup and login
- View products
- Add items to the cart
- Update item quantities in the cart
- Remove items from the cart
- Checkout and clear the cart
- Logout functionality

## Prerequisites

- Node.js and npm installed
- MySQL server installed and running

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/my-signup-app.git
    cd my-signup-app
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Set up the MySQL database:

    - Create a database named `ecommerce`.
    - Create a `users` table:

        ```sql
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        ```

    - Create a `products` table:

        ```sql
        CREATE TABLE products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            image_url VARCHAR(255)
        );
        ```

    - Create a `cart` table:

        ```sql
        CREATE TABLE cart (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            product_id INT NOT NULL,
            quantity INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
        ```

4. Update the MySQL connection settings in `server.js`:

    ```javascript
    const db = mysql.createConnection({host: 'localhost',
        user: 'root',
        password: 'your_mysql_password',
        database: 'ecommerce'
    });
    ```

5. Start the server:

    ```sh
    node server.js
    ```

6. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
my-signup-app/
├── public/
│   ├── assets/
│   │   └── bootstrap/
│   │       └── css/
│   │           └── bootstrap.min.css
│   ├── header.html
│   ├── login.html
│   ├── products.html
│   ├── shopping-cart.html
│   └── signup.html
├── .env
├── package.json
├── server.js
└── README.md
```

## Usage

- **Signup**: Navigate to the signup page and create a new account.
- **Login**: Navigate to the login page and log in with your credentials.
- **View Products**: After logging in, navigate to the products page to view available products.
- **Add to Cart**: Click the "Add to Cart" button on a product to add it to your cart.
- **View Cart**: Navigate to the shopping cart page to view items in your cart.
- **Update Quantity**: Update the quantity of items in your cart.
- **Remove from Cart**: Remove items from your cart.
- **Checkout**: Click the "Checkout" button to clear your cart and complete the purchase.
- **Logout**: Click the "Logout" button to log out of your account.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
```

This `README.md` file provides an overview of the project, installation instructions, project structure, usage, and license information. Make sure to replace `your-username` and `your_mysql_password` with your actual GitHub username and MySQL password, respectively.This `README.md` file provides an overview of the project, installation instructions, project structure, usage, and license information. Make sure to replace `your-username` and `your_mysql_password` with your actual GitHub username and MySQL password, respectively.