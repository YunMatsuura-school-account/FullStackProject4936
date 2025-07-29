const express = require("express"); //framework
const app = express();
require("dotenv").config(); // enable to read .env
const cors = require("cors"); //enable communication with Front end

//importing Routes
const allUsers = require("./routes/allusers");
const signUp = require("./routes/signup");
const signIn = require("./routes/signin");
const home = require("./routes/home");

//Middleware for cors
app.use(
  cors({
    origin: ["http://localhost:3123", "http://127.0.0.1:3123"],
  })
);

app.use(express.json());
app.get("/allusers", allUsers);
app.use("/signup", signUp);
app.use("/signin", signIn);
app.use("/home", home);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 600).json({
    success: false,
    message: err.message,
    details: err.details || null,
  });
});

const PORT = process.env.PORT || 4900;
app.listen(PORT, (err) => {
  console.log("Backend server is running on port ", PORT);

  if (err) {
    console.log(err.message);
  }
});
