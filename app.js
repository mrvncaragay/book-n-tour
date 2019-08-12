require('dotenv').config();
// Handle async errors
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');

const authRoute = require('./routes//authRoutes');
const userRoute = require('./routes/userRoutes');
const profileRoute = require('./routes/profileRoutes');

const app = express();

app.enable('trust proxy');

// Parse incoming request with json and urlencoded payload
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log additional info for every request
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
