const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {   
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["checkIn", "checkOut"],
      required: [true, "Attendance status is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
