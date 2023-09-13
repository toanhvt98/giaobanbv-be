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
 
  ]),
  userController.insertOne
);

//thieeu authentication.loginRequired
router.get("/", userController.getUsers);


/**
 *@route GET /users/me
 * @description  Get current user info
 * @access Login required
 */
 router.get("/me", authentication.loginRequired, userController.getCurrentUser);

 router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  userController.updateUser
);
 router.put(
  "/resetpass/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  userController.resetPass
);


/**
 * @route DELETE /user/:id
 * @description  Delete comment
 * @body
 * @access Login required
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    
  ]),
  userController.deleteUser
);


module.exports = router;
