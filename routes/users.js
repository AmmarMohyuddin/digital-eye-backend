const express = require("express");
const router = express.Router();

const {
  list,
  signUp,
  signIn,
  forgotPassword,
  changePassword,
  verifyOtp,
  markAttendance,
  verifyToken,
} = require("../controllers/users");

router.get("/", list);
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", changePassword);
router.post("/verifyOtp", verifyOtp);
router.get("/verifyToken", verifyToken)
router.post("/markAttendence", markAttendance)

module.exports = router;
