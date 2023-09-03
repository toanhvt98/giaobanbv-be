const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const bcgiaobanController = require("../controllers/bcgiaoban.controller");


/**
 * @route POST /bcgiaobans
 * @description Insert a new account
 * @body {Ngay,TTHeNoi,TTHeNgoai,TrangThai}
 * @access
 */
router.post(
  "/",
  validators.validate([
    body("Ngay", "Invalid Ngay").exists().notEmpty(),
       ]),
  bcgiaobanController.insertOne
);

module.exports = router;
