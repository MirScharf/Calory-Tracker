import { login } from "authController.js";
import express from "express"

const router = express.Router();
router.post("/login", login);  // login function from authController handles the logic of post request 
export { router };  