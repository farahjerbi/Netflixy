const router = require('express').Router();
const listController = require('../controllers/listController');
const verify = require('../verifyToken')


router.post("/create",verify,listController.create)
router.delete("/delete/:id",verify,listController.delete)
router.get("/get",verify,listController.get)

module.exports = router;