const User = require("../../models/user");
const Attendance = require("../../models/attendance")
const bcrypt = require("bcryptjs");

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find the user and populate attendances
    const user = await User.findOne({ email }).populate('attendances');

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Set the token in the user document (if required) and save
    user.authenticationToken = user.generateToken();
    await user.save();

    return res.status(200).json({
      message: "User Successfully Signed In",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        employeeNo: user.employeeNo,
        department: user.department,
        company: user.company,
        faceArray: user.faceArray,
        attendances: user.attendances,
        uuid: user.uuid,
        authenticationToken: user.authenticationToken,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred, please try again later." });
  }
}

module.exports = signIn;
