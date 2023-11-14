import mongoose from "mongoose";
import bcrypt from "bcrypt";


const caloryIntake= mongoose.Schema({
    day: String,
    calories: Number,
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    caloryIntake: [caloryIntake],
    caloryGoal: Number,
},
{
    timestamps: true,
})

userSchema.pre("save", async function (){
    this.password = await bcrypt.hash(this.password, 10);
})

export const User = mongoose.model('User', userSchema)
