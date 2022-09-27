const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/add", userController.POST);
router.post("/login", userController.LOGIN);

module.exports = router;
