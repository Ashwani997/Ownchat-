const express = require('express');
//application define
const app = express();
const { config } = require('dotenv');
//load environment file
config();
//import the GoogleGenerativeAI
const { GoogleGenerativeAI } = require("@google/generative-ai");
//generate a API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//Import the model 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "write a essay on Ai."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

const path = require('path');
const cookieParser = require('cookie-parser');
//import the mongodb
const { connectToMongoDB } = require('./connect');
const mongoose = require('mongoose');
const User = require('./models/user');
const userRoute = require('./router/user');

// staticRoute is an import
const staticRoute = require('./router/staticRoute');

//Set the port
const PORT = process.env.PORT||8300;

connectToMongoDB('mongodb://127.0.0.1:27017/OwnChat')
  .then(() => console.log('Mongodb Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

//Middleware to Json Parse Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//static route
app.use('/', staticRoute);
app.use(express.static(__dirname + '/assets'));

//userRoute
app.use('/auth', userRoute);

//set the ejs template engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.listen(PORT, () =>
  console.log(`Server Started at PORT:http://localhost:${PORT}`)
);
