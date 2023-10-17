import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: 24 * 60 * 60  // New Token required after 24 hours 
    })
}