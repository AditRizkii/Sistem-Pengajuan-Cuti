import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import router from './routes/UserRoute.js';
import Authrouter from './routes/AuthRoute.js';
import bodyParser from 'body-parser';
import db from './config/database.js';
import SequelizeStore from "connect-session-sequelize";
import Constantsrouter from './routes/ConstantRoute.js';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db,
    expiration: 24 * 60 * 60 * 1000
});

// (async () => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// app.use(express.json());

// Use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(Authrouter);
app.use(Constantsrouter);

app.listen(process.env.APP_PORT, ()=> {
    console.log(`Server listening on ${process.env.APP_PORT}`);
});