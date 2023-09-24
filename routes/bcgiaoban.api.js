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

// get bcgiaoban theo fromDate toDate, tra ra bcgiaoban co bo sung ngay
router.get("/allbyngay",authentication.loginRequired,bcgiaobanController.getByNgay)
module.exports = router;

//update or insert BCGiaoBan theo fromDate va toDate, tra ra giong nhu tren
router.post("/allbyngay",authentication.loginRequired,bcgiaobanController.updateOrInsert)


//update or insert BCGiaoBan theo fromDate va toDate, tra ra giong nhu tren
router.post("/trangthai",authentication.loginRequired,bcgiaobanController.updateOrInsertTrangThai)

module.exports = router;
 