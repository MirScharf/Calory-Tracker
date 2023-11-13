import express from "express"
import { Meal } from "./recipyModels.js";
import { User } from "./userModels.js"

const router = express.Router();

// Fn for meal creation form on /recipyhub
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

        const { title } = request.body;
        const titleExists = await Meal.findOne({ title })
        if (titleExists) {
            return response.json({ message: "Meal already exists" })
        }
        const meal = await Meal.create(request.body);
        return response.status(201).send(meal);

    } catch (error) {
        response.status(500).send({ message: error.message});
    }
};

// Fn for current-day caloric intake submission
const postCalories = async(request, response)=> {
    try {
        if (!request.body.calories){
            return response.status(400).send({
            message :"No calories in request.body"
        });
        }
        const { user, day, calories } = request.body;
        const dayExists = await User.findOne({'caloryIntake': {$elemMatch: { day: day }}});
        if (dayExists) {
        return response.send({message: `Already submitted calories for the day on ${day}.`});
        }

        const caloryThisDay = await User.findOneAndUpdate(
            { username: user },  // filter criteria 
            { $push: { caloryIntake:{ day, calories }}},
            { new: true }
            ) 
        return response.status(201).send( caloryThisDay )
    } catch (error) {
        response.status(500).send({ message: error.message});
    }
}

// Fn for getting user's caloric intake history
const getCalories = async(request, response) => {
    try {
        const { username } = request.body;
        const userdata = await User.findOne({username});
        if (!username){return response.send( {message: "No username in request" })}
        return response.json(userdata.caloryIntake)
    } catch (error) {
        response.status(500).json({ message: 'Server Error'})
    }
}

router.post('/postrecipy', postRecipy)
router.post('/postcalories', postCalories)
router.post('/getcalories', getCalories)
export default router; 