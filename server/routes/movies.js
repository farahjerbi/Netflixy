const router = require('express').Router();
const movieController = require('../controllers/movieController');
const verify = require('../verifyToken')


router.post("/create",verify,movieController.create)
router.put("/update/:id",verify,movieController.update)
router.delete("/delete/:id",verify,movieController.delete)
router.get("/get/:id",verify,movieController.get)
router.get("/random",verify,movieController.random)
router.get("/getAll",movieController.getAll)

module.exports = router;