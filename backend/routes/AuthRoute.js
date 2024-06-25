import express from "express";
import { Login, Me, logOut } from "../controllers/Auth.js"; 

const Authrouter = express.Router();

Authrouter.get('/me', Me);
Authrouter.post('/login', Login);
Authrouter.delete('/logout', logOut);

export default Authrouter;