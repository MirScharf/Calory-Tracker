import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Meal } from "./models/recipyModels.js";
import cookieParser from "cookie-parser";
import authRoute from "./models/authRoute.js"
import userRoute from "./models/userRoute.js"
import cors from "cors"

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // front-end domain
    methods: 'GET, POST, PUT, DELETE', // allowed HTTP methods.
    credentials: true, // Enable credentials (cookies and HTTP authentication)
  };
app.use(cors(corsOptions));

app.use(cookieParser())

// Middleware for parsing request body
app.use(express.json());

const requestTime = function (request, response, next) {
    request.requestTime = new Date(Date.now()).toString()
    next()
  }

app.use(requestTime);

app.use('/', authRoute)

app.use('/user', userRoute)

// Give routing to / 
app.get('/', (request, response) => {   
  console.log(request);
  return response.status(234).send(`You accessed this site at ${request.requestTime}`);
});

// Get-request for all meals  
app.get('/allmeals', async (request, response) => {   
    try {
        const meals = await Meal.find();
        response.json(meals) 
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Server Error'})
    }
});



/// ---------- The folowing endpoints were created for testing purposes and are not in use -------

// Post a Review to a list param 
// Do not allow multiple reviews for the same author
app.post('/meals/:title/reviews', async (request,response) => {
  const { title } = request.params;
  const { text, author } = request.body;
  try {
    const meal = await Meal.findOne({ title });
    if (meal.length == 0){
        return response.status(404).send('NOT FOUND sorry :(');
    }
    if (text.length <= 4 || author.length <= 2){
        return response.send('Either your review is not long enough or author is missing')
    }
    if (meal.reviews.some((x) => x.author === author)){
        return response.send('This author already has reviewed the meal')
    } 

  console.log(`Review: ${text}`)
  meal.reviews.push({ text, author })
  await meal.save();
  console.log(`Review von ${author} hinzugefügt`)
  response.json({ message: 'Review hinzugefügt'})
  } catch (error){
      return response.status(404).send('Meal not found');
  }
})

// Get-Request for individual reviews
app.get('/meals/:title/reviews/:author', async (request,response) => {
    const { title, author } = request.params;
    console.log(title, author)
    try{
        const meal = await Meal.findOne({ title });
        console.log(`title is: ${title}, _id ist: ${author}`)
    return response.json(meal.reviews.find(item => item.author.toString() === author.toString()).text)
    } catch (error){ 
        response.json('not found')
    }
})

// Delete-Request for a review of a author
app.delete('/meals/:title/reviews/:author', async (request,response) => {
    const { title, author } = request.params;
    console.log(title, author)
    try{
        console.log("t1")
        const meal = await Meal.findOne({ title });
        console.log("t2")
        console.log(`title is: ${title}, author ist: ${author}`)
        meal.reviews = meal.reviews.filter(item => item.author.toString() !== author)
        await meal.save();
    return response.json('Review Deleted!')
    } catch (error){ 
        response.json('not found')
    }
})

// Get-request for publishing year
app.get('/meals/:publishYear', async (request, response) => {   
    const { publishYear } = request.params;
    try {
        const meals = await Meal.find({ publishYear });
        
        console.log(meals.length);
        if (meals.length == 0) {
          return response.status(404).send('NOT FOUND sorry :(');
        }
        response.json(meals);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Server Error'}).send('nothing');
    }
    
});

//Get-Request for specific title
app.get('/meals/title/:title', async (request,response) => {
    const { title }  = request.params;
    console.log('Der wert von "title" ist:', title);
    try {
      const meal = await Meal.findOne({ title });

      if (!meal) {
        return response.status(404).send(`No meal found with the title "${title}" found.`);
      }

      response.json(meal);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: 'Server error' });
    }
});

// get-Request for individual Meals
app.get('/meals/:_id', async (request,response) => {
    const { _id }  = request.params;
    const hardcodedId = "651ed6101415ccfd12ffb189";
    console.log( _id ); 
    try {
      const meal = await Meal.findOne({ _id: hardcodedId });

      if (!meal) {
        return response.status(404).send("No meal found");
      }

      response.json(meal);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: 'Server error' });
    }
});

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB")
        // runs express server
        app.listen(PORT, () => {
            console.log(`App is on port: ${PORT}`); 
        });
    })
    .catch(() => {
        console.error("connection failed", 500)
    });
