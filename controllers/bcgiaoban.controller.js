const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const BCGiaoBan = require("../models/BCGiaoBan");

const bcgiaobanController = {};

bcgiaobanController.insertOne = catchAsync(async (req, res, next) => {
  //get data from request
  let { Ngay, TTHeNoi, TTHeNgoai, TrangThai } = req.body;

  //Business Logic Validation
  let bcgiaoban = await BCGiaoBan.findOne({ Ngay });
  console.log(bcgiaoban);
  if (bcgiaoban)
    throw new AppError(
      400,
      "BC Giao ban đã tồn tại ngaỳ này",
      "Insert BC giao ban error"
    );

  //Process

  bcgiaoban = await BCGiaoBan.create({ Ngay, TTHeNoi, TTHeNgoai, TrangThai });

  //Response
  sendResponse(res, 200, true, { bcgiaoban }, null, "Created User success");
});

module.exports = bcgiaobanController;
