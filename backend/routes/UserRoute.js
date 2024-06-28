import express from "express";
import { 
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    updateCuti,
    updateCutiAtYearEnd
 } from "../controllers/UserController.js";

 import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

 const router = express.Router();

//  const updateSisaCuti = async (req, res) => {
//     try {
//         await updateCutiAtYearEnd();
//         res.status(200).json({msg: "Leave data updated for the new year"});
//     } catch (error) {
//         res.status(500).json({msg: "Failed to update leave data"});
//     }
// }

 router.get("/users",verifyUser,adminOnly, getUsers);
 router.get("/users/:id",verifyUser,adminOnly, getUserById);
 router.post("/users",verifyUser,adminOnly, createUser);
 router.patch("/users/:id",verifyUser,adminOnly, updateUser);
 router.patch("/users-cuti/:id",verifyUser, updateCuti);
 router.delete("/users/:id",verifyUser,adminOnly, deleteUser);
 router.patch('/update-cuti-year-end', updateCutiAtYearEnd);
 
 export default router;