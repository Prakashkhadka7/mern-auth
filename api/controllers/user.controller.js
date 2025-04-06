import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const test = ((req, res) => {
    res.json({
        message: 'API is working'
    });
    
});

// Update user
export const updateUser = (async(req, res, next) => {
    console.log(req.params.id);
    if(req.user._id !== req.params.id){
    // return res.status(403).json({ message: "You can update only your account!" });
    return next(errorHandler(401,"You can update only your account!"));
    }
    try {
        if(req?.body?.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture

        } }, { new: true });
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (error) {
        next(error);
    }

})
