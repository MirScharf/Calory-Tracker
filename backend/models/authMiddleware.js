import { User } from "./userModels.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const userVerification = (request, response) => {
    const token = request.cookies.token
    if (!token) {
        return response.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
        if (error) {
            return response.json({ status: false})
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