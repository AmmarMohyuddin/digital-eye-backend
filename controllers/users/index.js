const list = require("./list");
const signUp = require("./signUp");
const signIn = require("./signIn");
const forgotPassword = require("./forgotPassword");
const changePassword = require("./changePassword");
const verifyOtp = require("./verifyOtp");
const verifyToken = require("./verifyToken");
const markAttendance = require("./attendence");

module.exports = {
  list,
  signUp,
  signIn,
  forgotPassword,
  changePassword,
  verifyOtp,
  verifyToken,
  markAttendance
};
