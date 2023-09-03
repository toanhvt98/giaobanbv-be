const { sendResponse, catchAsync, AppError } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userController = {};

userController.insertOne = catchAsync(async (req, res, next) => {
  //get data from request
  let { UserName, Email, PassWord, KhoaID, HoTen, PhanQuyen } = req.body;

  //Business Logic Validation
  let user = await User.findOne({ UserName });
  if (user)
    throw new AppError(400, "User already exists", "Registration Error");

  //Process
  const salt = await bcrypt.genSalt(10);
  PassWord = await bcrypt.hash(PassWord, salt);
  user = await User.create({
    UserName,
    Email,
    PassWord,
    KhoaID,
    HoTen,
    PhanQuyen,
  });
  const accessToken = await user.generateToken();
  //Response
  sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Created User success"
  );
});


userController.getCurrentUser = catchAsync(async (req, res, next) => {
  const curentUserId = req.userId;

  const user = await User.findById(curentUserId);
  if (!user)
    throw new AppError(400, "User not found", "Get current User Error");
  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get current User successful"
  );
});


module.exports = userController;
