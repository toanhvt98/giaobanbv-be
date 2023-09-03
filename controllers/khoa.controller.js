const { catchAsync,sendResponse } = require("../helpers/utils");
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
  sendResponse(res, 200, true,{khoa}, null, "Created User success");
});


khoaController.getAll = catchAsync(async (req, res, next) => {
  //get data from request
 
  //Business Logic Validation
  

  //Process
  let khoas = await Khoa.find();
  
  //Response
  sendResponse(res, 200, true,{khoas}, null, "Created User success");
});
module.exports = khoaController;
