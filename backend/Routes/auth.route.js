import express from "express";
import { registerUser, loginUser, logOutUser, getUserCredentials, updateUserCredentials, deleteUser, updateHistory, removeFromHistory } from "../Controllers/auth.controller.js";
import { verifyToken } from "../config/tokenGenerator.js";

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logOutUser)

router.get('/credentials', verifyToken, getUserCredentials)
router.patch('/credentials/update', verifyToken, updateUserCredentials)
router.patch('/update/history',verifyToken,updateHistory)
router.post('/update/history/delete',verifyToken,removeFromHistory)
router.delete('/delete', verifyToken, deleteUser)

export default router;