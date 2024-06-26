import express from "express";
import {
  getConstants,
  getConstantsById,
  createConstants,
  updateConstants,
  deleteConstants,
} from "../controllers/ConstantController.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const Constantsrouter = express.Router();

Constantsrouter.get("/constants", verifyUser, getConstants);
Constantsrouter.get("/constants/:id", verifyUser, adminOnly, getConstantsById);
Constantsrouter.post("/constants", verifyUser, adminOnly, createConstants);
Constantsrouter.patch("/constants/:id", verifyUser, adminOnly, updateConstants);
Constantsrouter.delete(
  "/constants/:id",
  verifyUser,
  adminOnly,
  deleteConstants
);

export default Constantsrouter;
