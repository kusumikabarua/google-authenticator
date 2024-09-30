require("dotenv").config({ path: "src/.env" });
const express = require("express");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 4000;
const cors =require("cors");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);


app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");

const userRoutes = require("./routes/userRoute");
const mySqlPool = require("./config/db");

app.use("/", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend server is running");
  });
mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("MY Sql DB connected");
    app.listen(PORT, () => {
      console.log("Server Running on port 4000");
    });
  })
  .catch((error) => {
    console.log("Couldnt connect to My Sql DB",error)
  });
