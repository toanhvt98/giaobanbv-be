const { catchAsync, sendResponse } = require("../helpers/utils");
const Khoa = require("../models/Khoa");
const khoaController = {};

khoaController.insertOne = catchAsync(async (req, res, next) => {
  //get data from request
  let { TenKhoa, MaKhoa, LoaiKhoa, STT } = req.body;
  console.log(TenKhoa);
  //Business Logic Validation
  let khoa = await Khoa.findOne({ MaKhoa });

  if (khoa) throw new AppError(400, "MaKhoa đã tồn tại", "Insert khoa error");

  //Process

  khoa = await Khoa.create({ TenKhoa, MaKhoa, LoaiKhoa, STT });
  console.log(khoa);
  //Response
  sendResponse(res, 200, true, { khoa }, null, "Created Khoa success");
});

khoaController.getAll = catchAsync(async (req, res, next) => {
  //get data from request

  //Business Logic Validation

  //Process
  let khoas = await Khoa.find();

  //Response
  sendResponse(res, 200, true, { khoas }, null, "Get Khoa success");
});
khoaController.deleteKhoa = catchAsync(async (req, res, next) => {
  const khoaId = req.params.id;

  const khoa = await Khoa.findOneAndDelete({
    _id: khoaId,
  });

  return sendResponse(res, 200, true, khoa, null, "Delete Khoa successful");
});

khoaController.updateKhoa = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const { TenKhoa, MaKhoa, STT, LoaiKhoa } = req.body;
  let khoa = await Khoa.findById(id);

  if (!khoa) throw new AppError(400, "Không tồn tại khoa", "update khoa error");

  let check = await Khoa.findOne({ MaKhoa: MaKhoa });
  if (check && check._id !== id)
    throw new AppError(400, "Không tồn tại khoa", "update khoa error");
  else {
    khoa.STT = STT;
    khoa.TenKhoa = TenKhoa;
    khoa.MaKhoa = MaKhoa;
    khoa.LoaiKhoa = LoaiKhoa;
    khoa.save();
    sendResponse(res, 200, true, { khoa }, null, "Created Khoa success");
  }
});
module.exports = khoaController;
