const express = require('express')
require('dotenv').config();

const cookieParser = require('cookie-parser')
const app = express();
const indexRouter = require ('./src/routes/index')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const session = require('express-session')
const FileStore = require('session-file-store')(session)


const cookie_secret = process.env.cookie_secret || '123456'
//forma de firmar la cookie
app.use(cookieParser(cookie_secret));

const storeConfig = {path:'./session', ttl:300, retries: 0}
app.use(session({
    store: new FileStore(storeConfig),
    secret:cookie_secret,
    resave:true,
    saveUninitialized:true
}))
app.use(indexRouter);





module.exports = app;