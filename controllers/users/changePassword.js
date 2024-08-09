const User = require("../../models/user");
const bcrypt = require("bcryptjs");

async function changePassword(req, res) {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required!" });
  }

  if (!confirmPassword) {
    return res.status(400).json({ message: "Confirm password is required!" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error: Something went wrong... ${error.message}` });
  }
}

module.exports = changePassword;
