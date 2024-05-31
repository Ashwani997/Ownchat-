
// //import the GoogleGenerativeAI
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// //generate a API key
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// //Import the model 
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
// async function run() {
//   // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

//   const prompt = "what is pythagoras theorem."

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();

// module.exports = {
//     model,
//   };