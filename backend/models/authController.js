import { createSecretToken } from "./secretToken.js";
import { User } from "./userModels.js";
import bcrypt from "bcryptjs"


// Checks if User (in request.body) is new. Creates new User 
const login = async (request, response, next) => {
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
        response.status(201).json({ message: "User sign in succesfully", success: true, user}) // 201: Created (new session established)
    }
    catch (error) {
        console.log(error.message);
        response.send({ message: error.message});
    }
}