const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const baocaongayController = require("../controllers/baocaongay.controller");
const authentication = require("../middlewares/authentication");

/**
 * @route POST /baocaongay
 * @description Insert a new account
 * @body { Ngay,KhoaID,BaoCaoNgay}
 * @access
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("Ngay", "Invalid Ngay").exists().notEmpty(),
    body("KhoaID", "Invalid KhoaID").exists().notEmpty(),
    
       ]),
  baocaongayController.insertOrUpdateOne
);

router.get(
  "/",
  authentication.loginRequired,
  baocaongayController.getOneByNgayKhoaID
);
router.get(
  "/all",
  authentication.loginRequired,
  baocaongayController.getAllByNgay
);

module.exports = router;
