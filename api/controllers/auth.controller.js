import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = (async(req, res,next) => {
console.log(req.body);
const { username, email, password } = req.body;

try 
{
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({username,email,password: hashedPassword});
    await newUser.save();
    res.status(201).json({message: 'User created successfully'});
    console.log(res)

} catch(error){
   next(errorHandler(500,"User already exists"));
}
    
}); 