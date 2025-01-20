const express = require('express');
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb'); // Import the collection model
const dotenv = require('dotenv'); // For loading environment variables

dotenv.config(); // Load environment variables from .env file

const app = express();

// Set up static files and views
app.use(express.static(path.join(__dirname, '../public')));
const templatePath = path.join(__dirname, '../templates');
app.set('view engine', 'hbs');
app.set('views', templatePath);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.render('login'); // Render the signup page
});

app.get('/signup', (req, res) => {
    res.render('signup'); // Render the login page
});

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Validate the input
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).send('All fields are required!');
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match!');
        }

        // Create and save user data
        const data = { username, email, password, confirmPassword };
        await collection.create(data);

        res.render('login'); // Redirect to the home page on success
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Something went wrong, please try again.');
    }
});

// Render the login page
app.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});

// Handle login logic
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate the input
        if (!email || !password) {
            return res.status(400).send('Email and password are required!');
        }

        // Check if the user exists in the database
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found! Please sign up first.');
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).send('Incorrect password!');
        }

        res.render('home'); // Redirect to the home page on successful login
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Something went wrong, please try again.');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});
