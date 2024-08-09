const User = require("../../models/user");
const Attendance = require("../../models/attendance");

async function verifyToken(req, res) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);

  if (!authHeader) {
    return res.status(400).json({ message: "Authentication Token is required." });
  }

  try {
    // Find the user by authentication token and populate the attendances
    const user = await User.findOne({ authenticationToken: authHeader })
      .populate({
        path: 'attendances',
        populate: {
          path: 'user', // Ensure 'user' is the correct reference in the Attendance model if needed
          select: 'firstName lastName email', // Adjust as needed
        },
      });

    if (!user) {
      return res.status(404).json({ message: "No user found with this token" });
    }

    return res.status(200).json({ message: "User Detail", user: user });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "An error occurred, please try again later" });
  }
}

module.exports = verifyToken;
