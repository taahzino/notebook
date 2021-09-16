// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Configurations
dotenv.config({ path: './config/config.env' });
const { env } = process;

// Establish database connection
const MONGO_URI = env.ENVIRONMENT === 'production' ? env.MONGO_REMOTE : env.MONGO_LOCAL;
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database has been connected successfully!');
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

// Create the express app
const app = express();

// Setup view engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.COOKIE_SECRET));

// Serve static files
app.use(express.static(`${__dirname}/public`));

// Manage routes
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/app'));

// Start the server
app.listen(env.PORT, () => {
    console.log(`Server is running in ${env.ENVIRONMENT} mode on PORT ${env.PORT}`);
    if (env.ENVIRONMENT === 'development') {
        console.log(`Go: http://localhost:${env.PORT}/`);
    }
});
