const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const cors = require('cors');

const usersRouter = require('./usersRouter');
const authRouter = require('./auth/authRouter');
const authenticator = require('./auth/authenticator');

const server = express();

const sessionConfig = {
    name: "this is a cookie",
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
      maxAge: 1000 * 60, // good for 1 min in ms
      secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
      httpOnly: true, // true means JS on the client cannot access the cooke
    },
  };

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig))

server.get('/', (req, res) => {
    res.status(200).json({ message: 'hey!'})
});

server.use('/api/users', authenticator, usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;