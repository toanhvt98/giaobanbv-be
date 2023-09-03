var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");
const validators = require("../middlewares/validators");

/**
 * @route POST /auth/login  Login with username and password
 * @description  Login with username and password
 * @body {UserName,PassWord}
 * @access Public
 */
router.post(
  "/login",
  validators.validate([
    
    body("UserName", "Invalid UserName").exists().notEmpty(),
    body("PassWord", "Invalid password").exists().notEmpty(),
  ]),
  authController.loginWithUserName
);

module.exports = router;
