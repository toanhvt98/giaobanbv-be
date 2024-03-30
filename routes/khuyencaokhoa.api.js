const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const khuyencaokhoaController = require("../controllers/khuyencaokhoa.controller");
const authentication = require("../middlewares/authentication");

/**
 * @route POST /bcgiaobans
 * @description Insert a new account
 * @body {Ngay,TTHeNoi,TTHeNgoai,TrangThai}
 * @access
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("Ngay", "Invalid Ngay").exists().notEmpty(),
       ]),
  khuyencaokhoaController.insertOne
);

/**
 * @route GET /khuyencaokhoa/getonebythangnam
 * @description get khuyencaokhoa by thang nam
 * @params {Thang, Nam}
 * @access login require,
 */
router.get("/getonebythangnam",authentication.loginRequired,khuyencaokhoaController.getOneByThangNam)

/**
 * @route POST /khuyencaokhoa
 * @description Insert or Update a new khuyencaokhoa
 * @body { Thang,Nam,khuyencaokhoa}
 * @access  login require,
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("Thang", "Invalid Thang").exists().notEmpty(),
    body("Nam", "Invalid Nam").exists().notEmpty(),
    
       ]),
  khuyencaokhoaController.insertOrUpdateOne
);
module.exports = router;
