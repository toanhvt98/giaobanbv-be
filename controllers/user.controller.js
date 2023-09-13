const { sendResponse, catchAsync, AppError } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userController = {};

userController.insertOne = catchAsync(async (req, res, next) => {
  //get data from request
  console.log(req.body)
  let { UserName, Email, PassWord, KhoaID, HoTen, PhanQuyen } = req.body;

  //Business Logic Validation
  let user = await User.findOne({ UserName });
  if (user)
    throw new AppError(400, "User already exists", "Registration Error");
    // const user = await User.findOne({ UserName }, "+PassWord");
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

  const user = await User.findById(curentUserId).populate('KhoaID');
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


userController.getUsers = catchAsync(async (req, res, next) => {
  const curentUserId = req.userId;
  let { page, limit, ...filter } = { ...req.query };

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [];

  if (filter.UserName) {
    filterConditions.push({ UserName: { $regex: filter.UserName, $options: "i" } });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await User.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  console.log("filter",filterConditions)
  let users = await User.find(filterCriteria) .select("+PassWord")
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  // const promises = users.map(async (user) => {
  //   let temp = user.toJSON();
  //   temp.friendship = await Friend.findOne({
  //     $or: [
  //       { from: curentUserId, to: user._id },
  //       { from: user._id, to: curentUserId },
  //     ],
  //   });
  //   return temp;
  // });
  // const usersWithFriends = await Promise.all(promises);
  return sendResponse(
    res,
    200,
    true,
    { users, totalPages, count },
    null,
    ""
  );
});

userController.updateUser = catchAsync(async (req, res, next) => {
  
  const userId = req.params.id;
console.log("userID",userId)
  let user = await User.findById(userId);
  if (!user) throw new AppError(400, "User not found", "Update  User Error");

  const allows = [
    "Email",
    "HoTen",
    "KhoaID",
  
    "PhanQuyen",
    "UserName",
    
  ];
  // const salt = await bcrypt.genSalt(10);
  // let PassWord = req.body["PassWord"]

  // PassWord = await bcrypt.hash(PassWord, salt);
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });
  // user["PassWord"] =PassWord;
  await user.save();
  return sendResponse(res, 200, true, user, null, "Update User successful");
});

userController.resetPass = catchAsync(async (req, res, next) => {
  
  const userId = req.params.id;
console.log("userID",userId)
  let user = await User.findById(userId);
  if (!user) throw new AppError(400, "User not found", "Update  User Error");

  const salt = await bcrypt.genSalt(10);
  let PassWord = req.body["PassWord"]

  PassWord = await bcrypt.hash(PassWord, salt);
  
  user["PassWord"] =PassWord;
  await user.save();
  return sendResponse(res, 200, true, user, null, "Update User successful");
});

userController.deleteUser = catchAsync(async (req, res, next) => {
  
  const userId = req.params.id;

  const user = await User.findOneAndDelete({
    _id: userId,
    });
 
  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Delete User successful"
  );
});


module.exports = userController;
