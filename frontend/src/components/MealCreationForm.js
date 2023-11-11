import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllMeals } from "../utils/api_getAllMeals";

const MealCreationForm = () => {
    const handleSubmitMealCreation = async (e) => {  
        e.preventDefault();  // Default behaviour would refresh page
        
        // Meal creation: form input 
        const form = e.target;
        const title = form.querySelector('input[name="title"]').value;
        const calories = form.querySelector('input[name="calories"]').value;
        const ingredients = form.querySelector('input[name="ingredients"]').value;
  
        try {
          const anyFieldEmpty = !title | !calories | !ingredients;
          if (anyFieldEmpty){return toast.error("All Fields are required!",{autoClose: 2000})}
          const response = await axios({
            method: 'POST',
            url: 'http://localhost:5555/user/postrecipy',
            data: {
              title: title,
              author: "miroo",
              ingredients: ingredients,
              calories: calories,
            }})
  
            const { message } = response.data;
            console.log(message)
            if (message === "Meal already exists") {
              return toast.error("Meal already exists", {
                  hideProgressBar: true,
                  autoClose: 2000,
                }
            )};
  
            toast.success("Meal created!",{
              hideProgressBar: true,
              autoClose: 1000,
            })
            } catch (error) {
              console.log(error)}
          getAllMeals()  // Update the List of all Meals
          
      }

    return (
        <div>
            <form onSubmit={handleSubmitMealCreation}  id="mealCreationForm">
                <p id="mealCreationHeadline">Create your own Recipy/Meal!</p>
                <label>Meal title: </label>
                <input type="text" name="title"/><br></br>
                <label>Calories: </label>
                <input type="text" name="calories"/><br></br>
                <label>Ingredients: </label>
                <input type="text" name="ingredients"/><br></br>
                <button type="submit">Create Meal</button>
            </form>
        </div>
      );
    };

export default MealCreationForm;