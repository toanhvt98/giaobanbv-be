const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const baocaosucoController = require("../controllers/baocaosuco.controller");
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
  
  baocaosucoController.insertOne
);

// router.get(
//   "/",
//   authentication.loginRequired,
//   baocaongayController.getOneByNgayKhoaID
// );
router.get(
  "/all",
  authentication.loginRequired,
  baocaosucoController.getBaocaosucos
);

module.exports = router;
