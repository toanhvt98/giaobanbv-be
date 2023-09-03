const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const baocaongayController = require("../controllers/baocaongay.controller");


/**
 * @route POST /baocaongay
 * @description Insert a new account
 * @body { Ngay,KhoaID,BaoCaoNgay}
 * @access
 */
router.post(
  "/",
  validators.validate([
    body("Ngay", "Invalid Ngay").exists().notEmpty(),
    body("KhoaID", "Invalid KhoaID").exists().notEmpty(),
    
       ]),
  baocaongayController.insertOrUpdateOne
);

router.get(
  "/",
  
  baocaongayController.getOneByNgayKhoaID
);
router.get(
  "/all",
  
  baocaongayController.getAllByNgay
);

module.exports = router;
