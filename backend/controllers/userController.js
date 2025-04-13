const createHttpError = require("http-errors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = createHttpError(400, "All fields are required");
            return next(error);
        }

        const isUserPresent = await User.findOne({ email });
        if (!isUserPresent) {
            const error = createHttpError(401, "Invalid credentials");
            return next(error);
        }

        const accessToken = jwt.sign(
            { _id: isUserPresent._id },
            config.accessTokenSecret,
            { expiresIn: "1d" }
        );

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: isUserPresent
        });

        console.log(isUserPresent.email, "logged in");
    } catch (error) {
        console.error("Error at login:", error.message); // Ensure you log the plain message
        next(error);
    }
};

const getUserData=async(req,res,next)=>{
try{
    const user=await User.findById(req.user._id);
    res.status(200).json({
        success:true,
        data:user
    });
    console.log("get data of",user.email);
}
catch(error){
    next(error);    
}
}

const logout=async(req,res,next)=>{
    try{
        res.cookie('accessToken', '', { 
            expires: new Date(0), 
            httpOnly: true, 
            secure: true, 
            sameSite: "None" 
        });

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        });
        console.log(req.user.name,"logged out");
    }
    catch(error){
        next(error);
    }
}


 module.exports={login,getUserData,logout};