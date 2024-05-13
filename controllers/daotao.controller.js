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
      `Thêm thành công cán bộ ${data.TenCanBo}`
    );
  } catch (error) {
    throw new AppError(400, error, "Lỗi thêm cán bộ");
  }
});

daotao_thongtincanboController.themDanhSachTinChi = catchAsync(
  async (req, res, next) => {
    const { MaCanBo } = req.params;
    const tinChiData = {
      _id: "663f85d541cb24b91b451cdc", // _id của hình thức tin chỉ
      TenHinhThuc: "hinh thuc tu do1",
      DanhSachTinChi: [],
    };
    try {
      data = await daotao_thongtincanbo.findOneAndUpdate(
        { MaCanBo: MaCanBo },
        { $push: { TongHopTinChi: tinChiData } },
        { new: true, useFindAndModify: false }
      );
      console.log(data);
      sendResponse(
        res,
        201,
        true,
        { data },
        null,
        `Sửa thành công thành công cán bộ`
      );
    } catch (error) {
      throw new AppError(400, error, "Sửa Lỗi ");
    }
  }
);
daotao_thongtincanboController.themDanhSachTongHopTinChi = catchAsync(
  async (req, res, next) => {
    const { MaCanBo } = req.params;
    const tinChiData = {
      _id: "testID", // _id của hình thức tin chỉ
    };
    try {
      data = await daotao_thongtincanbo.findOneAndUpdate(
        { MaCanBo: MaCanBo },
        { $push: { "TongHopTinChi.$[elem].DanhSachTinChi": tinChiData } },
        {
          new: true,
          useFindAndModify: false,
          arrayFilters: [{ "elem._id": "663f85d541cb24b91b451cdc" }],
        }
      );
      console.log(data);
      sendResponse(
        res,
        201,
        true,
        { data },
        null,
        `Sửa thành công thành công cán bộ`
      );
    } catch (error) {
      throw new AppError(400, error, "Sửa Lỗi ");
    }
  }
);

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
