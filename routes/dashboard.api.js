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
