const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const dashboardController = require("../controllers/dashboard.controller");
const authentication = require("../middlewares/authentication");

/**
 * @route POST /dashboard
 * @description Insert or Update a new dashboard
 * @body { Ngay,KhoaID,dashboard}
 * @access  login require,
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("Ngay", "Invalid Ngay").exists().notEmpty(),
    body("KhoaID", "Invalid KhoaID").exists().notEmpty(),
    
       ]),
  dashboardController.insertOrUpdateOne
);

router.get(
  "/",
  authentication.loginRequired,
  dashboardController.getOneNewestByNgay
);
router.get(
  "/all",
  authentication.loginRequired,
  dashboardController.getAllByNgay
);

module.exports = router;
