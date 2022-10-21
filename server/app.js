require('dotenv').config();
const express = require('express');
const upload = require('express-fileupload');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const FileStore = require('session-file-store')(session);

const path = require('path');

const authRouter = require('./src/routes/auth.router');
const usersRouter = require('./src/routes/users.router');

const {
  DB_PASS, DB_USER, PORT, COOKIE_SECRET, COOKIE_NAME, DB_NAME,
} = process.env;

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster1.aylau7p.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
  .then(console.log('DB Ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.set('cookieName', COOKIE_NAME);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(upload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  session({
    name: app.get('cookieName'),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400,
    },
  }),
);

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.listen(PORT || 5000, () => console.log(`Server started on port ${PORT}`));
