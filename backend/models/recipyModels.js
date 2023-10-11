import mongoose from "mongoose";

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const reviewSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    text: String,
    author: String,
    
},
{
    timestamps: true,
})

const mealSchema = mongoose.Schema(
    {   
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
    },
    {
        timestamps: true,
    }
)
// Creating a model
export const Meal = mongoose.model('Cat', mealSchema)