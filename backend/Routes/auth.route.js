import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  updateUserCredentials,
  deleteUser,
  getList,
  updateList,
  removeFromList,
} from "../Controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);

router.get("/list", verifyToken, getList);
router.patch("/credentials/update", verifyToken, updateUserCredentials);
router.patch("/update/list", verifyToken, updateList);
router.post("/delete/list", verifyToken, removeFromList);
router.delete("/delete", verifyToken, deleteUser);

export default router;
