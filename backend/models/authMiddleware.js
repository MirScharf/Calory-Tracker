import { User } from "./userModels.js";
import pkg from "jsonwebtoken";
import dotenv from 'dotenv';
import { request, response } from "express";
dotenv.config();
const { jwt } = pkg;

export const userVerification = (request, response) => {
    const token = request.cookies.token
    if (!token) {
        return response.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
        if (error) {
            return response.json({ staatus: false})
        } else {
            const user = await User.findById(data.id)
            if (user) {
                return response.json({ status: true, user: user.username })
            } else {
                return response.json({ status: false })
            }
            
        }

    })
}