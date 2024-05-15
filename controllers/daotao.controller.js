const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const {
  daotao_thongtincanbo,
  daotao_hinhthuctinchi,
} = require("../models/daotao");

const daotao_thongtincanboController = {};
const daotao_hinhthuctinchiController = {};
// Thông tin cán bộ
daotao_thongtincanboController.getThongTinCanBo = catchAsync(
  async (req, res, next) => {
    data = await daotao_thongtincanbo.find({}).populate("KhoaID").exec();
    sendResponse(res, 200, true, { data }, null, "Lấy dữ liệu thành công");
  }
);
daotao_thongtincanboController.them = catchAsync(async (req, res, next) => {
  data_body = req.body;

  try {
    data = await daotao_thongtincanbo.create(req.body);
    sendResponse(
      res,
      201,
      true,
      { data },
      null,
      `Thêm thành công cán bộ ${data_body.TenCanbo}`
    );
  } catch (error) {
    throw new AppError(400, error, "Lỗi thêm cán bộ");
  }
});

// Hình thức tính tín chỉ
daotao_hinhthuctinchiController.getHinhThucTinChi = catchAsync(
  async (req, res, next) => {
    data = await daotao_hinhthuctinchi.find({});
    sendResponse(res, 200, true, { data }, null, "Lấy dữ liệu thành công");
  }
);
daotao_hinhthuctinchiController.them = catchAsync(async (req, res, next) => {
  data_body = req.body;
  try {
    data = await daotao_hinhthuctinchi.create(req.body);
    sendResponse(
      res,
      201,
      true,
      { data },
      null,
      `Thêm thành công hình thức tín chỉ ${data.TenHinhThuc}`
    );
  } catch (error) {
    throw new AppError(400, error, "Lỗi thêm hình thức tín chỉ");
  }
});
module.exports = {
  daotao_thongtincanboController,
  daotao_hinhthuctinchiController,
};
