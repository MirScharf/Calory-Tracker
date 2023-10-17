import { register, login } from "./authController.js";
import express from "express"
import { userVerification } from "./authMiddleware.js";

const router = express.Router();
router.post('/register', register);  // register function from authController handles the logic of post request 
router.post('/login', login)
router.post('/', userVerification)  
export default router;  