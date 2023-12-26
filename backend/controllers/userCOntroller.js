const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const validator = require("validator");
const { generateToken } = require("../utils/token");
const cookieParser = require('cookie-parser');
const {  generateChatCompletion } = require("../config/openai");
const jwt = require('jsonwebtoken')
const userSignup = async(req,res)=>{
    //usersignup 
    try {
        const {username,email,password} = req.body;
        if(!username || !email||!password){
            throw Error("Enter the filed properly");
        }
        if(!validator.isEmail(email)){
            throw Error("Email is invalid");
        }
        
        const hashpassword =  await bcrypt.hash(password,10);
        const newUser = new User({username,email,password:hashpassword});
        await newUser.save();
        
        
        const newToken = generateToken(newUser);
        res.cookie('authToken', newToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true ,path:'/',sameSite:'lax'});

        return res.status(200).json({message:"new user save succesfully",newUser,newToken});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in singup ", cause: error.message });
    }


}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            
            return res.status(401).json({ message: 'Incorrect email or password from backend login conroller' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if passwords match
        if (!passwordMatch) {
           
            return res.status(401).json({ message: 'Incorrect email or password from backend login conroller' });
        }

        res.cookie('authToken', '', { expires: new Date(0), httpOnly: true });

        const newToken = await generateToken(user);
        // console.log(newToken);
        res.cookie('authToken', newToken, { maxAge:7 * 24 * 60 * 60 * 1000, httpOnly: true });
        // Customize the success response as needed
        return res.status(200).json({ message: 'Login successful from backend login controller', user ,newToken});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error in login from backend login conroller', cause: error.message });
    }
};


//CHAT CONTORLLERS 
const genrateChatCon = async(req,res)=>{
    const { text } = req.body;
    const cookie = req.headers.cookie;
    if(!cookie){return res.status(401).json({ error: 'Unauthorized - Token missing' });}
    const token = cookie.split("=")[1];
    // console.log("fro genratee chat ",token);
    const secretKey = process.env.JWT_SEXRECT;
    try {

    
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        // console.log("from ",decoded.userId);
        
    const user = await User.findById(userId);
    if(!user){
        return res.status(401).json({message:"User is not register or token error"});

    }
    // console.log(user);
     const chats = user.chats.map(({role,content})=>({role,content}));
    chats.push({content:text,role:'user'});
    user.chats.push({content:text,role:"user"});
    const translatedText = await generateChatCompletion(text);
    user.chats.push({content:translatedText,role:"assistant"});
    await user.save();
    // console.log(user.chats);
    res.status(200).json({ translatedText ,user});
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error ${error.message }`});
  }

}


const sendChatsFron = async(req,res)=>{
    // const { text } = req.body;
    const cookie = req.headers.cookie;
    if(!cookie){return res.status(401).json({ error: 'Unauthorized - Token missing' });}
    const token = cookie.split("=")[1];
    // console.log("fro genratee chat ",token);
    const secretKey = process.env.JWT_SEXRECT;
    try {

    
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        // console.log("from ",decoded.userId);
        
    const user = await User.findById(userId);
    if(!user){
        return res.status(401).json({message:"User is not register or token error"});

    }
   
    res.status(200).json( { message: "ok", user});
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error ${error.message }`});
  }

}

const userLogout = async(req,res)=>{
    
    res.clearCookie('authToken').status(200).json({ message: 'Logout successful' });

}

module.exports = {getAllUser,userSignup,userLogin,userLogout,genrateChatCon,sendChatsFron};