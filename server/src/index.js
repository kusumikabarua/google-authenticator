require("dotenv").config({ path: "src/.env" });

const session = require("express-session");
const PORT = process.env.PORT || 4000;
const httpConfig = require("./config/httpConfig");
const express = httpConfig.express;
const app = httpConfig.app;
const http = httpConfig.http;

const io =require("./config/socketio")
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
    res.send("<h1>Hey Socket.io</h1>");
  });
mySqlPool
  .query("SELECT 1")
  .then(() => {

    console.log("MY Sql DB connected");
      
  io.on('connection', (socket) => {
    let token = socket.handshake.auth.token;
    console.log('a user connected '+token);
    socket.on('my message', (msg) => {
      console.log('message: ' + msg);
      io.emit('my broadcast', `server: ${msg}`);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


    http.listen(PORT, () => {
      console.log("Server Running on port 4000");
    });
  })
  .catch((error) => {
    console.log("Couldnt connect to My Sql DB",error)
  });
  
  module.exports = { io };


  
 

  
