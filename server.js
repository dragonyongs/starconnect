// server.js
require('dotenv').config();
require('./config/db');

const express = require('express');
const app = express();

const cors = require('cors');
const PATH = require('path');
const PORT = process.env.PORT || 5000;
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const session = require("express-session");
// const { assignSessionInfo } = require("./middlewares/sessionMiddleware");
const MemoryStore = require("memorystore")(session);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new MemoryStore({
            checkPeriod: 86400000,
        }),
        cookie: {
            maxAge: 86400000,
            httpOnly: true
            // ,secure: process.env.NODE_ENV === 'production'
        },
    })
);

// app.use(assignSessionInfo);

// 세션 로그 확인
// app.use((req, res, next) => {
//     console.log('Session ID:', req.sessionID);
//     console.log('Session Data:', req.session);
//     next();
// });

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.use(express.static(PATH.join(__dirname, './build/')));

app.get('*', (req, res) => {
    res.sendFile(PATH.join(__dirname, './build/', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
