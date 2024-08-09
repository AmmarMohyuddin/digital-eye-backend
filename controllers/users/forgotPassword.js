const User = require("../../models/user");
const { sendEmail } = require("../../utils/notification");
const crypto = require("crypto");

function generateOtp() {
  // return Math.floor(100000 + Math.random() * 900000).toString();
  return 112233;
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "No user found for this email" });
    }
    const otp = generateOtp();
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    if (email) {
      // await sendEmail(
      //   user.email,
      //   "Password Reset",
      //   `Your password reset OTP is ${otp}`
      // );
      res.status(200).json({ message: "Email successfully sent" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error: Something went wrong... ${error}` });
  }
}

module.exports = forgotPassword;
