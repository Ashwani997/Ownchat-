const express = require('express');
//application define
const app = express();
const { config } = require('dotenv');
//load environment file
config();
//import the GoogleGenerativeAI
const { GoogleGenerativeAI } = require('@google/generative-ai');

const path = require('path');
const cookieParser = require('cookie-parser');
//import the mongodb
const { connectToMongoDB } = require('./connect');
const mongoose = require('mongoose');
const User = require('./models/user');
const userRoute = require('./router/user');
let conversation = [];
// staticRoute is an import
const staticRoute = require('./router/staticRoute');

//Set the port
const PORT = process.env.PORT || 8300;

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

// POST request to handle form submission
app.post('/dashboard', async (req, res) => {
  const question = req.body.question;
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  const generationConfig = {
    stopSequences: ['red'],
    maxOutputTokens: 450,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig,
    });

    const result = await model.generateContent(question);
    const answer = await result.response.text();

    // Store the question and answer in the conversation array
    conversation.push({ question, answer });

    // Return the updated conversation history as JSON
    res.json({ conversation });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
});
  
app.listen(PORT, () =>
  console.log(`Server Started at PORT:http://localhost:${PORT}`)
);
