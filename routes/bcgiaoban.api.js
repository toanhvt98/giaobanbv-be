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

// get bcgiaoban theo fromDate toDate, tra ra bcgiaoban co bo sung ngay
router.get("/allbyngay",bcgiaobanController.getByNgay)
module.exports = router;

//update or insert BCGiaoBan theo fromDate va toDate, tra ra giong nhu tren
router.post("/allbyngay",bcgiaobanController.updateOrInsert)


//update or insert BCGiaoBan theo fromDate va toDate, tra ra giong nhu tren
router.post("/trangthai",bcgiaobanController.updateOrInsertTrangThai)

module.exports = router;
 