const express = require("express");
const khoaController = require("../controllers/khoa.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const authentication = require("../middlewares/authentication");

/**
 * @route POST /khoa
 * @description Insert a new Khoa
 * @body {TenKhoa,LoaiKhoa,STT,MaKhoa}
 * @access
 */
router.post(
  "/",
  validators.validate([
    body("TenKhoa", "Không có tên khoa").exists().notEmpty(),
    body("LoaiKhoa", "Thiếu loại khoa").exists().notEmpty(),
    body("STT", "Thiếu STT").exists().notEmpty(),
    body("MaKhoa", "Thiếu mã khoa").exists().notEmpty(),
  ]),
  khoaController.insertOne
);

/**
 * @route POST /users
 * @description Insert a new account
 * @body {TenKhoa,LoaiKhoa,STT,MaKhoa}
 * @access
 */
router.get(
  "/",

  khoaController.getAll
);

module.exports = router;
