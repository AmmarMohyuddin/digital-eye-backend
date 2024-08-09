const User = require("../../models/user.js");
const Attendance = require("../../models/attendance.js"); // Import the Attendance model
const faceapi = require('face-api.js');
const canvas = require('canvas');
const path = require('path');
const { Canvas, Image, ImageData } = canvas;

// Monkey-patch face-api.js to work with Node.js
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Load face-api.js models from disk
const loadModels = async () => {
  const modelPath = path.join(__dirname, '../../face-models');
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath),
      faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath),
      faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath),
    ]);
    console.log("Models loaded successfully");
  } catch (error) {
    console.error("Error loading models:", error);
  }
};

// Compare two face descriptors with a tolerance value
const isMatch = (descriptor1, descriptor2, tolerance = 0.6) => {
  const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  return distance <= tolerance;
};

// Mark attendance based on face recognition
async function markAttendance(req, res) {
  const { email, checkInStatus, faceArray } = req.body;
  console.log("Frontend FaceArray:", faceArray);

  if (!email || !checkInStatus || !faceArray) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await loadModels();

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (Array.isArray(user.faceArray) && Array.isArray(faceArray)) {
      const userFaceArray = new Float32Array(user.faceArray);
      const receivedFaceArray = new Float32Array(faceArray);

      if (isMatch(userFaceArray, receivedFaceArray)) {
        // Create a new attendance document
        const attendance = new Attendance({
          user: user._id,
          date: new Date(),
          status: checkInStatus,
        });

        // Save the attendance document
        await attendance.save();

        // Update the user's attendances
        user.attendances.push(attendance._id);
        await user.save();

        return res.status(200).json({ message: "Attendance marked successfully" });
      } else {
        return res.status(400).json({ message: "Face data does not match" });
      }
    } else {
      return res.status(400).json({ message: "Face data is missing or invalid" });
    }
  } catch (error) {
    console.error("Error marking attendance:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = markAttendance;
