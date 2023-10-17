import { request, response } from "express";
import { createSecretToken } from "./secretToken.js";
import { User } from "./userModels.js";
import bcrypt from "bcrypt"


// Checks if User (in request.body) is new. Creates new User 
const register = async (request, response, next) => {
    try {
        const { username, password } = request.body;
        const userExists = await User.findOne({ username })
        if (userExists) {
            return response.json({ message: "User already exists" })
        }
        const user = await User.create({ username, password });
        const token = createSecretToken(user._id);  // generates JSON Web Token 
        response.cookie("token", token, {
            withCredentials: true,  // allows cookie to be sent with corss-origin requests (CORS)
            httpOnly: false,  // allow client-side js-code tho access the cookie 
        })
        response.status(201).json({ message: "User registered succesfully", success: true, user}) // 201: Created (new session established)
        next()
    }
    catch (error) {
        console.log(error.message);
        response.send({ message: error.message});
    }
}

const login = async (request,response, next) => {
    try{
        const { username, password} = request.body
        if (!username || !password){
            return response.json({ message: 'All fields are required.'})
        }
        const user = await User.findOne({ username })
        if (!user) {
            return response.json({ message: 'Incorrect username or password'})
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return response.json({ message: ' Incorrect username or password'})
        }
        const token = createSecretToken(user._id)
        response.cookie("token", token, {
            withCredentials: true,  // allows cookie to be sent with corss-origin requests (CORS)
            httpOnly: false,  // allow client-side js-code tho access the cookie 
        })
        response.status(201).json({ message: "User logged in succesfully", success: true, user}) // 201: Created (new session established)
        next()
    } catch (error) {
        console.log(error.message);
        response.json({ message: error.message});
    }
}

export { register, login }