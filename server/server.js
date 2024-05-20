// server/server.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

console.log("Server running on port:", PORT);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello from server!' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
