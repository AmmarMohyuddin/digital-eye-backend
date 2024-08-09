const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    employeeNo: {
      type: String,
      required: [true, "Employee number is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    company: {
      type: String,
      required: [true, "Company is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@babtain\.com$/,
        "Email must be a valid @babtain.com address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    authenticationToken: {
      type: String,
      required: true
    },
    resetPasswordOtp: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    faceArray: {
      type: [Number],
      required: [true, "Face Recognition is required"]
    },
    attendances: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance"
    }]
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = function () {
  const maxAge = 3 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: maxAge,
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
