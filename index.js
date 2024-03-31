


const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
// const { body, validationResult } = require('express-validator'); // Import express-validator
const User = require('./model/signinmodel'); // Adjust the path as necessary
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
// const saltRounds = 10;
// const bcrypt = require('bcrypt');

// Initialize flash middleware


app.use(session({
    secret: '234565432@jkbvsdnbienfhassan2', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if you're using HTTPS
}));

app.use(flash());

// Make flash messages available in the views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.errors = req.flash('errors');
    next();
});


// Set views directory and template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());





// Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware to parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/hms', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log("Mongo Error", err));

// Serve the landing.html file at the root URL
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'views', 'landing.html'));
});

// Serve the signin.html file at the /signin URL
app.get('/select', (req, res) => {
 res.sendFile(path.join(__dirname, 'views', 'select.html'));
});

app.get('/forget', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
   });
   


app.get('/signin', (req, res) => {
    res.render('signin_up', { errors: [] }); // Pass any data you want to include in the view
});


// Route to handle form submissions without password validation
const { body, validationResult } = require('express-validator');




// Sign-up route with validation
app.post('/signup', 
body('name').trim().notEmpty().withMessage('Name is required'),
body('email').isEmail().withMessage('Email is not valid'),
body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signin_up', { errors: errors.array() });
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.flash('error_msg', 'Email is already registered');
            return res.redirect('/signin');
        }



// Example user creation
const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password:req.body.password,
});
        
            console.log(`New user created with the following id: ${user._id}`);
            req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('/signin');
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).send('Server error');
        }
    }
);



app.post('/sign_in', async (req, res) => {
  
    const { email, password } = req.body;

console.log(password); //
try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Invalid email.');
    }

    if (password !== user.password) { // Compare passwords directly
        return res.status(400).send('Invalid password.');
    }

    req.session.user = user;
    // Render homeuser.ejs instead of redirecting
    res.render('homeuser.ejs', { user: user });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).send('Server error');
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
