const { AppError, catchAsync, sendResponse } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authController = {};

module.exports = authController;

authController.loginWithUserName = catchAsync(async (req, res, next) => {
  //get data from request
  const { UserName, PassWord } = req.body;
  //Business Logic Validation
  const user = await User.findOne({ UserName }, "+PassWord");
  console.log(user);
  if (!user) throw new AppError(400, "Invalid Credentials", "Login Error");
  //Process
  const isMatch = await bcrypt.compare(PassWord, user.PassWord);
  if (!isMatch) throw new AppError(400, "Invalid Credentials", "Login Error");
  const accessToken = await user.generateToken();
  //Response
  sendResponse(res, 200, true, { user, accessToken }, null, "Login success");
});
module.exports = authController;
