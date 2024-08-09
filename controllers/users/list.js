const User = require("../../models/user.js");

async function list(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "All users",
      data: {
        users,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
}

module.exports = list;
