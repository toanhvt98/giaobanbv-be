const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");
const { use } = require("./auth.api");
const authentication = require("../middlewares/authentication");

/**
 * @route POST /users
 * @description Insert a new account
 * @body {UserName,Email,PassWord,KhoaID,HoTen,PhanQuyen}
 * @access
 */
router.post(
  "/",
  validators.validate([
    body("UserName", "Invalid name").exists().notEmpty(),
    body("PassWord", "Invalid password").exists().notEmpty(),
    body("KhoaID", "không có khoaID").exists().notEmpty(),
    body("PhanQuyen", "Không có phân quyền").exists().notEmpty(),
    body("HoTen", "không có họ tên").exists().notEmpty(),
  ]),
  userController.insertOne
);


/**
 *@route GET /users/me
 * @description  Get current user info
 * @access Login required
 */
 router.get("/me", authentication.loginRequired, userController.getCurrentUser);

 
module.exports = router;
