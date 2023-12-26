// index.js
const express = require('express');
const connectDB = require('./databases/db');
require('dotenv').config();
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
const { userSignup, getAllUser, userLogin, genrateChatCon, userLogout, sendChatsFron } = require('./controllers/userCOntroller');
const { verifyTokenMiddleware } = require('./utils/token');
const cors = require('cors');
// const {Configuration,OpenAI} = require("openai");

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true

};

app.use(cors(corsOptions));
connectDB();








const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());




app.post('/signup',userSignup);
app.post('/login',userLogin);
app.get('/logout',userLogout);
// PROTECTED ROUTE
app.get('/getusers',verifyTokenMiddleware,getAllUser);

// CHAT ROUTES
app.post("/chat/new-chat",verifyTokenMiddleware,genrateChatCon);
app.get("/chat/userChat",verifyTokenMiddleware,sendChatsFron);













app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
