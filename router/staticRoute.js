//static route is a fronted part
const express = require('express');
const router = express.Router();

//get request to render the home page
router.get('/', (req, res) => {
  return res.render('login');
});

//get request to render the dashboard page
router.get('/dashboard', (req, res) => {
  return res.render('dashboard');
});

// get request to render the sign up page
router.get('/signup', (req, res) => {
  return res.render('signup');
});
// get request to render the sign up page
router.get('/login', (req, res) => {
  return res.render('login');
});

module.exports = router;
