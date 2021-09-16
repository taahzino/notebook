const dotenv = require('dotenv');
const open = require('open');

dotenv.config({ path: './config/config.env' });

// open(`http://localhost:${process.env.port}/`, (err) => {
//     if (err) throw err;
// });
