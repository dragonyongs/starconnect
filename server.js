// server.js
require('dotenv').config();
require('./config/db');

const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const apiRoutes = require('./routes/apiRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 연결
app.use('/api', apiRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});