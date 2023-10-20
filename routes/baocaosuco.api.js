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
  "/",
  authentication.loginRequired,
  baocaosucoController.getBaocaosucos
);
router.get(
  "/danhsach",
  authentication.loginRequired,
  baocaosucoController.getBaocaosucosForDataGrid
);

router.get( 
  "/tonghop",
  authentication.loginRequired,
  baocaosucoController.tongHopSuCoYKhoa
);
router.get(
  "/tonghoptheokhoa",
  authentication.loginRequired,
  baocaosucoController.tongHopSuCoTheoKhoa
);

router.get(
  "/:sucoId",
  authentication.loginRequired, validators.validate([param("sucoId").exists().isString().custom(validators.checkObjectId)]),
  baocaosucoController.getById
);

router.delete(
  "/:sucoId",
  authentication.loginRequired,
  validators.validate([
    param("sucoId").exists().isString().custom(validators.checkObjectId),
      ]),
  baocaosucoController.deleteOneSuco
);
router.put(
  "/update",
  authentication.loginRequired,
 
  baocaosucoController.updateOneSuco
);
router.put(
  "/updatetrangthai",
  authentication.loginRequired,
 
  baocaosucoController.updateTrangThaiSuco
);

module.exports = router;
