// server/server.js


require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB 연결
const uri = `mongodb+srv://${process.env.MONGODB_URI_USERNAME}:${process.env.MONGODB_URI_PASSWORD}@users.nn35fcc.mongodb.net/?retryWrites=true&w=majority&appName=users`;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// 스키마 및 모델
const itemSchema = new mongoose.Schema({
    name: String,
});

const Item = mongoose.model('Item', itemSchema);

// 라우트
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

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
