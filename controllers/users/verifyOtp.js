const User = require("../../models/user");

async function verifyOtp(req, res) {
  console.log(req.body);
  const { email, otpCode } = req.body;

  if (!email || !otpCode) {
    return res.status(400).json({ message: "Email and OTP code are required" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "No user found with this email" });
    }

    if (
      user.resetPasswordOtp === otpCode &&
      user.resetPasswordExpires > Date.now()
    ) {
      return res.status(200).json({ message: "OTP is valid" });
    } else {
      return res.status(400).json({ message: "OTP is invalid or expired" });
    }
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "An error occurred, please try again later" });
  }
}

module.exports = verifyOtp;
