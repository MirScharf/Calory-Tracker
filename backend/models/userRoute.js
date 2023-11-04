import express from "express"
import { Meal } from "./recipyModels.js";

const router = express.Router();

const postRecipy = async(request, response)=> {
    try {
        if (
            !request.body.title || 
            !request.body.author || 
            !request.body.ingredients ||
            !request.body.calories
            
        ) {
            return response.status(400).send({
            message :"Send all required fields: title, author, ingredients, calories"
        });
        }
        const meal = await Meal.create(request.body);

        return response.status(201).send(meal);


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
    
};

router.post('/postRecipy', postRecipy)
export default router; 