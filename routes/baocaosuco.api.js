const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

const baocaosucoController = require("../controllers/baocaosuco.controller");
const authentication = require("../middlewares/authentication");

/**
 * @route POST /baocaosuco
 * @description Insert  new baocaosuco
 * @body {baocaosuco}
 * @access  login require,
 */
router.post(
  "/",
  authentication.loginRequired,
  
  baocaosucoController.insertOne
);

/**
 * @route GET /baocaosuco
 * @description Get all baocaosuco
 
 * @access  login require,
 */
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

/**
 * @route GET /baocaosuco/:sucoId
 * @description Get one baocaosuco
 * @params {sucoId}
 * @access  login require,
 */
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
