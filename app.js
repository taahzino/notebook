// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// Environment variables
dotenv.config({ path: './config/config.env' });
const { env } = process;
const MONGO_URI = env.ENVIRONMENT === 'production' ? env.MONGO_REMOTE : env.MONGO_LOCAL;

// Configurations
require('./config/passport')(passport);
require('./config/database')(mongoose, MONGO_URI);

// Create the express app
const app = express();

// Setup view engine
app.set('view engine', 'ejs');

// Session
app.use(
    session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl: MONGO_URI,
            collection: 'sessions',
        }),
    })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// Manage routes
app.use('/api', require('./routers/api'));
app.use('/auth', require('./routers/auth'));
app.use('/', require('./routers/app'));

// Serve static files
app.use(express.static(`${__dirname}/public`));

// Start the server
app.listen(env.PORT, () => {
    console.log(`Server is running in ${env.ENVIRONMENT} mode on PORT ${env.PORT}`);
    if (env.ENVIRONMENT !== 'production') {
        console.log(`Go: ${env.APP_URL}`);
    }
});

(() => {
    // eslint-disable-next-line global-require
    // [0] require('./updates/10oct2021')();
    // ** successfully executed [0]
})();
