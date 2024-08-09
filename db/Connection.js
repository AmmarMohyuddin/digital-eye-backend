const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connected = await mongoose.connect(
      "mongodb://127.0.0.1:27017/digitalEyeBackend",
      { useNewUrlParser: true }
    );

    if (connected) {
      console.log(`Connected to the Database  Successfully`);
    } else {
      throw new Error(
        `Failed to connect with Database : ${process.env.DATABASE_NAME}`
      );
    }

    return true;
  } catch (err) {
    throw new Error(
      `Failed to connect with Database : ${process.env.DATABASE_NAME}`
    );
  }
};

module.exports = dbConnection;
