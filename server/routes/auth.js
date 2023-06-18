const router = require('express').Router();
const authController = require('../controllers/authController');
const User =require('../models/User');


//REGISTER
router.post("/register",authController.register)
router.post('/login',authController.login)

module.exports = router;