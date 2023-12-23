const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { AppError,catchAsync } = require("../helpers/utils");

const User = require("../models/User");

const authentication = {};

authentication.loginRequired = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    console.log(req.headers);
    console.log(tokenString);
    if (!tokenString)
      throw new AppError(401, "Login required", "Authentication Error");
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token expired", "Authenticate Error");
        } else {
          throw new AppError(401, "Token is invalid", "Authentication Error");
        }
      }
      req.userId = payload._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

authentication.adminRequired = catchAsync(async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    console.log(req.headers);
    console.log(tokenString);
    if (!tokenString)
      throw new AppError(401, "Login required", "Authentication Error");
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token expired", "Authenticate Error");
        } else {
          throw new AppError(401, "Token is invalid", "Authentication Error");
        }
      }
      req.userId = payload._id;
     
    });
    const user = await User.findById(req.userId)
    console.log("user",user)
    if(!(user.PhanQuyen==='admin')) throw new AppError(401,"Admin required","Authenticate error")
    next();
  } catch (error) {
    next(error);
  }
});


authentication.adminOrTongtrucRequired = catchAsync(async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    console.log(req.headers);
    console.log(tokenString);
    if (!tokenString)
      throw new AppError(401, "Login required", "Authentication Error");
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token expired", "Authenticate Error");
        } else {
          throw new AppError(401, "Token is invalid", "Authentication Error");
        }
      }
      req.userId = payload._id;
     
    });
    const user = await User.findById(req.userId)
    console.log("user",user)
    if(!(user.PhanQuyen==='admin'||user.PhanQuyen==='manager')) throw new AppError(401,"Admin or Manager required","Authenticate error")
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = authentication;
