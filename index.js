require("dotenv").config();
const express = require("express");
const dbConnection = require("./db/Connection");
const routes = require("./routes");
const cors = require("cors");
const morgan = require("morgan");
const User = require("./models/user");
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan("tiny"));
app.use(cors());

app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 100000 })
);

app.use("/api/v1", routes);

dbConnection()
  .then((result) => {
    if (result) {
      app.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
      });
    }
  })
  .catch(() => {
    console.error(`Failed to connect with database`);
    process.exit(1);
  });
