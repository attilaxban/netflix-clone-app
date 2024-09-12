import express from "express";
import { registerUser, loginUser, logOutUser, getUserCredentials, updateUserCredentials, deleteUser, updateList, removeFromList } from "../Controllers/auth.controller.js";
import { verifyToken } from "../config/tokenGenerator.js";

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logOutUser)

router.get('/credentials', verifyToken, getUserCredentials)
router.patch('/credentials/update', verifyToken, updateUserCredentials)
router.patch('/update/list',verifyToken,updateList)
router.post('/update/list/delete',verifyToken,removeFromList)
router.delete('/delete', verifyToken, deleteUser)

export default router;