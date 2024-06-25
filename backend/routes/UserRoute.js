import express from "express";
import { 
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    updateCuti
 } from "../controllers/UserController.js";

 import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

 const router = express.Router();

 router.get("/users",verifyUser,adminOnly, getUsers);
 router.get("/users/:id",verifyUser,adminOnly, getUserById);
 router.post("/users",verifyUser,adminOnly, createUser);
 router.patch("/users/:id",verifyUser,adminOnly, updateUser);
 router.patch("/users-cuti/:id",verifyUser, updateCuti);
 router.delete("/users/:id",verifyUser,adminOnly, deleteUser);
 
 export default router;