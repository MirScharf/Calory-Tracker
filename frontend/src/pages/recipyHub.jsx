import React from "react";
import './RecipyHub.css';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Plot from "react-plotly.js";

const RecipyHub = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [cookies, removeCookie] = useCookies([]);    
    const [allMeals, setAllMeals] = useState([]);
    const [allMealsJsx, setAllMealsJsx] = useState([]);
    const [currentListJsx, setCurrentListJsx] = useState([]);
    const [currentMeals, setCurrentMeals] = useState([]);
    const [currentCalories, setCurrentCalories] = useState([]);
    const [sum, setSum] = useState();
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [previousCalories, setPreviousCalories] = useState([]);
    const [chartCaloryTracking, setChartCaloryTracking] = useState([]);
    
    
    // Get all Meals/Recipys from backend
    // Save meals via useState 
    const getAllMeals = () => axios({
        method: 'GET',
        url: 'http://localhost:5555/allmeals'
        }).then((response) => {
        setAllMeals(response.data)
         }).catch((error) => console.log(error));

    useEffect(() => {
        const verifyCookie = async () => {
        if (!cookies.token) {
          navigate("/login");
        }
        const { data } = await axios.post(
            "http://localhost:5555",
            {},
            { withCredentials: true }  // send cookies
            );
            
            if (!data.status){
                removeCookie("token");
                navigate("/login");
            } else {setUser(data.user)}}
        verifyCookie();
        
        toast.info("Your are now in the Recipy Hub!",{
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          toastId: 'success2',
        })
        
        getAllMeals();
        
        }, [cookies, navigate, removeCookie])
        
    // Button: Removes meals from currentMeals   
    const handleSubtractButton = (itemToRemove) => {
        const updatedMeals = currentMeals.filter(item => item._id !== itemToRemove);
        setCurrentMeals(updatedMeals)
    }
    
    useEffect(() => {
        setCurrentCalories(currentMeals.map(item => parseInt(item.calories))) 
        setCurrentListJsx(
            <div id="scrollContainer">
            {currentMeals.map((item, index) => (
                <div id="allMeals" key={`${item._id}_${index}`}>
                <button id="substractButton" onClick={() => handleSubtractButton(item._id)}>-</button>
                <p>{item.title}</p>
                <p>Calories: {item.calories}</p>
                </div>
            ))}
            </div>
        );
    }, [sum, currentMeals]);

    useEffect(() => {
        setSum(currentCalories.reduce((accumulator, currentValue) => accumulator + currentValue, 0))    
    } ,[currentCalories])

        
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

    const [inputValue, setInputValue] = useState({mealName: ""});
      const { mealName } = inputValue;
      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]: value,
        });
    };

    // Get previous daily calory intake
    const getPreviousCalories = async () => {
        try {
            if (!user){return}
            const response = await axios.post('http://localhost:5555/user/getcalories', { username: user });
            let caloryArr = response.data.map(item => item.calories);
            setPreviousCalories(caloryArr);
            return caloryArr;
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if(!user){return}
        const fetchData = async () => {
            const arr = await getPreviousCalories();
            if (arr){setPreviousCalories(arr)}       
        };
        fetchData();
    }, [user]);
    

    useEffect(() => {
        setAllMealsJsx(
            <div id="scrollContainer">
                {allMeals.map((item, index) => (
                    <div key={`${item._id}_${index}`} id="allMeals">
                        <button type="submit" id="addButton" onClick={() => setCurrentMeals([...currentMeals, item])}>+</button>
                        <p>{item.title}</p>
                        <p>Calories: {item.calories}</p>
                    </div>
                ))}
            </div>
        )
    },[allMeals, currentMeals])
    
    // Filter Meals by Calories and by MealName input
    useEffect(() => {
        const calFilter = 500;
        const filteredMeals = allMeals.filter(meal => 
        meal.title.toLowerCase().includes(mealName.toLowerCase()) && (checkboxChecked ? meal.calories > calFilter : true));
        setAllMealsJsx(
            <div id="scrollContainer">
            {filteredMeals.map((item, index) => (
                <div key={`${item._id}_${index}`} id="allMeals">
                    <button type="submit" id="addButton" onClick={() => setCurrentMeals([...currentMeals, item])}>+</button>
                    <p>{item.title}</p>
                    <p>Calories: {item.calories}</p>
                </div>))}
            </div>
        )
    },[mealName, allMeals, currentMeals, checkboxChecked])

    
    const handleCheckboxChange = () => {
        setCheckboxChecked(!checkboxChecked);
    };

    // Submit Calories for a day
    const handleSubmitcurrentCalories = async () => {  
        const calories = sum;
        const date = new Date()
        const fullDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
        await axios({
        method: 'POST',
        url: 'http://localhost:5555/user/postcalories',
        data: {
            user: user,
            day: fullDate,
            calories: calories,
        }})
        setPreviousCalories(getPreviousCalories)
    }
    
    useEffect(() => {
        const currenChart = () => {
            if (!previousCalories | !previousCalories.length){return}
            const lastWeeksCaloricIntake = previousCalories.slice(Math.max(previousCalories.length - 7, 0))
            const data = [
                {
                  type: "scatter",
                  mode: "lines+markers",
                  x: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
                  y: lastWeeksCaloricIntake, 
                  marker: { color: "blue" },
                },
            ];
          
            const layout = {
                title: "Last Week's Caloric Intake",
                xaxis: { title: "Previous Seven Days"},
                yaxis: { title: "Calories" },
                font: { size: 14 },
            };
          
            return (
                <div>
                    <h3 id="chartHeadline">Monitor your daily caloric intake</h3>
                    <Plot data={data} layout={layout} />
                </div>
            );
          };
        setChartCaloryTracking(currenChart)
    },[previousCalories])
    
    
    return (
        <div>
        <h3>Recipy Hub - Track your Calory intake!</h3>

        {/* List of all meals */}
        <div id="allMealsContainer"> <p id="allMealsHeadline">List of all Meals</p>
        <label htmlFor="mealName">
        <input id="mealName" name="mealName" value={mealName} placeholder="Filter by name" onChange={handleOnChange}></input>
        </label>
        <label className="container" id="mealFilter">Calories &ge; 500
        <input type="checkbox" id="checkbox" checked={checkboxChecked} onChange={handleCheckboxChange}></input>
        </label>
            {allMealsJsx}
        </div>
        
        {/* List of current Meals */}
        <div id="currentMeals"> <p id="currentMealsHeadline">Add today's meals</p>
        Current Calories: {sum}<br></br>
        <button type="submit" onClick={handleSubmitcurrentCalories} id="submitCaloryButton">Submit your calory count</button>
        {currentListJsx}
        </div>

        {/* Calory Chart */}
        <div id="caloryChart">
            {chartCaloryTracking}
        </div>

        {/* Meal creation form */}
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
    </div>
    )
}

export default RecipyHub;