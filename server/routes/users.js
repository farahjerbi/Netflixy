const router = require('express').Router();
const usersController = require('../controllers/usersController');
const User =require('../models/User');
const verify = require('../verifyToken')


router.put("/update/:id",verify,usersController.update)
router.delete("/delete/:id",verify,usersController.delete)
router.get("/get/:id",verify,usersController.get)
router.get("/getAll",verify,usersController.getAll)
router.get("/stats",verify,usersController.stats)

module.exports = router;