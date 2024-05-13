const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const {
  daotao_thongtincanboController,
  daotao_hinhthuctinchiController,
} = require("../controllers/daotao.controller");
const authentication = require("../middlewares/authentication");
// Router thông tin cán bộ
router.get(
  "/thongtincanbo",
  authentication.loginRequired,
  daotao_thongtincanboController.getThongTinCanBo
);
router.post(
  "/thongtincanbo/them",
  authentication.loginRequired,
  daotao_thongtincanboController.them
);

router.put(
  "/thongtincanbo/sua/:MaCanBo",
  authentication.loginRequired,
  daotao_thongtincanboController.themDanhSachTinChi
);
// Router hình thức tín chỉ
router.put(
  "/thongtincanbo/test/:MaCanBo",
  authentication.loginRequired,
  daotao_thongtincanboController.themDanhSachTongHopTinChi
);
// Router hình thức tín chỉ

router.get(
  "/hinhthuctinchi",
  authentication.loginRequired,
  daotao_hinhthuctinchiController.getHinhThucTinChi
);
router.post(
  "/hinhthuctinchi/them",
  authentication.loginRequired,
  daotao_hinhthuctinchiController.them
);

module.exports = router;
