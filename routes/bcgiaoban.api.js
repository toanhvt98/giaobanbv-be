const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const bcgiaobanController = require("../controllers/bcgiaoban.controller");
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
  bcgiaobanController.insertOne
);

/**
 * @route GET /bcgiaoban/allbyngay
 * @description get bcgiaoban by fromDate toDate
 * @params {fromDate, toDate}
 * @access login require,
 */
router.get("/allbyngay",authentication.loginRequired,bcgiaobanController.getByNgay)
module.exports = router;

/**
 * @route POST /bcgiaoban/allbyngay
 * @description update or insert bcgiaoban by fromDate toDate
 * @body [bcgiaobans]
 * @access login require,
 */
router.post("/allbyngay",authentication.loginRequired,bcgiaobanController.updateOrInsert)


/**
 * @route POST /bcgiaoban/trangthai
 * @description update trangthai for bcgiaoban by date,trangthai
 * @body {ngay,trangthai}
 * @access login require,
 */

router.post("/trangthai",authentication.loginRequired,authentication.adminOrTongtrucRequired,bcgiaobanController.updateOrInsertTrangThai)

module.exports = router;
 