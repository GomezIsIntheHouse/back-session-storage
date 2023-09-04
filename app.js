const express = require('express')
require('dotenv').config();

const cookieParser = require('cookie-parser')
const app = express();
const indexRouter = require ('./src/routes/index')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const cookie_secret = process.env.cookie_secret || '123456'
//forma de firmar la cookie
app.use(cookieParser(cookie_secret));
app.use(indexRouter);





module.exports = app;