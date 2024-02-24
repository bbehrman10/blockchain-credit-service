// backend/index.js
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Importing routes
const userRoutes = require('./src/routes/userRoutes');
const vendorRoutes = require('./src/routes/vendorRoutes');

// Using routes
app.use('/api/users', userRoutes);
app.use('/api/vendors', vendorRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
