const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.MONGODB_URI_USERNAME}:${process.env.MONGODB_URI_PASSWORD}@starconnect.294auud.mongodb.net/?retryWrites=true&w=majority&appName=starconnect`;

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
