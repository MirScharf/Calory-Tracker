import express from "express"
import { Meal } from "./recipyModels.js";
import { User } from "./userModels.js"

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

const postCalories = async(request, response)=> {
    try {
        if (!request.body.calories){
            return response.status(400).send({
            message :"Send all required fields: title, author, ingredients, calories"
        });
        }
        const { user, day, calories } = request.body;
        const caloryThisDay = await User.findOneAndUpdate(
            { username: user },  // filter criteria 
            { $push: { caloryIntake: { day, calories } } },
            { new: true }
            // {username: user}, {$push: {"caloryIntake$day": day}}
            ) 
        return response.status(201).send( caloryThisDay )
    } catch (error) {
        response.status(500).send({ message: error.message});
    }

}

const getCalories = async(request, response) => {
    try {
        const { username } = request.body;
        console.log(username);
        const userdata = await User.findOne({username});
        if (!username){return response.send( {message: "No username in request" })}
        console.log(userdata.caloryIntake);
        return response.json(userdata.caloryIntake)
    } catch (error) {
        response.status(500).json({ message: 'Server Error'})
    }
}

router.post('/postrecipy', postRecipy)
router.post('/postcalories', postCalories)
router.post('/getcalories', getCalories)
export default router; 