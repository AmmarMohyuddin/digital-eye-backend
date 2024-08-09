const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

async function signUp(req, res) {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    employeeNo,
    department,
    company,
    // profileImage,
    faceArray,
  } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ message: "User Already Exist!" });
  }

  try {
    const newUser = new User({
      email,
      firstName,
      lastName,
      employeeNo,
      department,
      company,
      // profileImage,
      faceArray,
      password: await bcrypt.hash(password, 10),
      uuid: uuidv4(),
    });

    await newUser.save();
    res.status(200).json({
      message: "User Successfully Signed Up",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        employeeNo: newUser.employeeNo,
        department: newUser.department,
        company: newUser.company,
        // profileImage: newUser.profileImage,
        faceArray: newUser.faceArray,
        uuid: newUser.uuid,
        authenticationToken: newUser.authenticationToken(),
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: `${error.message}`,
    });
  }
}

module.exports = signUp;
