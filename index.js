const express = require('express');
//application define
const app = express();
const { config } = require('dotenv');
//load environment variables
config();
const {OpenAI}  = require('openai');
//Initialize OpenAI API
const openai= new OpenAI({
  apiKey:process.env.OpenaiKey
});
// Define a route to handle questions for openai key response
app.get("/ask",async (req,res)=> {
  // Call the OpenAI API to generate an answer
  const completion = await openai.createCompletion({
    model:""
  
  });
  res.send(completion.data);
})

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
