const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Importing routes
const userRoutes = require('./src/routes/userRoutes');
const user = require('./src/models/user');
// const vendorRoutes = require('./src/routes/vendorRoutes');
// const paymentRoutes = require('./src/routes/paymentRoutes');
app.use(cors());
// Using routes
app.use('/api/users', userRoutes);
// app.use('/api/vendors', vendorRoutes);
// app.use('/api/payments', paymentRoutes)


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
