import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid credentials"));
    }
    const token = jwt.sign(
      {
        _id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    const { password: hashedPassword, ...others } = validUser._doc;
    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    res
      .cookie("access_token", token, { httpOnly: true ,expires: expiryDate})
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

export const google = async(req,res,next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user){
      const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET
      );
      const {password: hashedPassword, ...others} = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("access_token", token, {httpOnly: true, expires: expiryDate}).status(200).json(others);

      // const token = jwt.sign(
      //   {
      //     _id: user._id,
      //   },
      //   process.env.JWT_SECRET
      // );
      // const { password: hashedPassword, ...others } = user._doc;
      // const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      // res
      //   .cookie("access_token", token, { httpOnly: true ,expires: expiryDate})
      //   .status(200)
      //   .json(others);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("_").toLowerCase() + (Math.floor(Math.floor(Math.random() * 10000))).toString(),
        email: req.body.email,
        password: hashedPassword});
      await newUser.save();
      const token = jwt.sign(
        {
          _id: newUser._id,
        },
        process.env.JWT_SECRET
      );
      const { password: hashedPassword2, ...others } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, { httpOnly: true ,expires: expiryDate})
        .status(200)
        .json(others);
    }
  } catch (error) {
  }
}