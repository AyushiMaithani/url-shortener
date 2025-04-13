require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const cors = require('cors');
const app = express();


const PORT = config.port;
connectDB();

//middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL||'http://localhost:5173',  // Frontend URL
  credentials: true,   
}));
app.use(express.json());


//root endpoint
app.get('/', (req, res) => {
    res.json ({message: 'Hello from Server!'});
});

//other endpoints
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/url', require('./routes/urlRoutes'));
// app.use('/api/dashboard', require('./routes/dashboardRoutes'));


//server
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

