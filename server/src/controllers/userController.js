const mySqlPool = require("../config/db");
const io =require("../config/socketio");
const loadAuth = (req, res) => {
  res.render("auth");
};
const {sendEmail} = require("../email/nodemailer")
const successGoogleLogin = async (req, res) => {
  if (!req.user) res.redirect("/failure");
  console.log(req.user);
  const { displayName, email, id } = req.user;
  const [rows] = await mySqlPool.query(
    "SELECT id FROM users where googleprofileid= ? ",
    [id]
  );
//   console.log("rows"+rows.length);
//   console.log("displayName"+displayName);
//   console.log("email"+email);
//   console.log("id"+id);
  if (rows.length===0) {
    const user = await mySqlPool.query("INSERT INTO users set ?", [
      { "name": displayName, "email": email, "googleprofileid": id ,"role":"user"},
    ]);
    console.log("userId"+user.id);
  }
  res.send("Welcome " + req.user.email);
};

const failureGoogleLogin = (req, res) => {
  res.send("Error");
};
const register = async (req, res) => {
  try {
  
    const userData = req.body;
    console.log("register",userData.email);
    const user = await mySqlPool.query(
            `SELECT *  from users where email = ?`,[userData.email]
          );
    console.log("user ",user[0][0]);
    if(user[0].length>0){
      res.status(200).json({
        message: "User already registered",
        user: user[0][0],
      });
    }else{
      const [{ insertId }] = await mySqlPool.query("INSERT INTO users set ?", [userData]);
    console.log("user",insertId);
    io.emit('New User Registered', `server: ${insertId}`);
    userData.id=insertId;
    const admins = await mySqlPool.query(
      `SELECT email  from users where role = "admin"`
    );
    let adminEmails =admins[0][0].email;
    for(let i=1;i< admins[0].length;i++){
      adminEmails =adminEmails+","+admins[0][i].email;
    };
    console.log("adminEmails",adminEmails);
    sendEmail(adminEmails,userData.name,userData.email);
    res.status(201).json({
      message: "User Registered Successfully",
      user: userData,
    });}
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
// const getUserByEmail=async (email) => {
//   try {
//     const id = await mySqlPool.query(
//       `SELECT id  from users where email = ?`,[email]
//     );
//     return id;
   
//   } catch (err) {
//     console.log(err);
//   }
// };
const listUsers = async (req, res) => {
  try {
    const data = await mySqlPool.query(
      `SELECT *  from users;`
    );
    res.status(202).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const login = async (req, res) => {
  try {
    const userData = req.body;
    const { token, userId } = await authService.login(userData);
    res.status(200).json({
      message: "User Logged in Successfully",
      userId: userId,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const googleLogout = (req, res) => {
    req.session = null;
    req.logout(function(err){
        if(err)  console.log("Error while destroying session:", err);
        console.log("You are logged out");
        res.redirect('/');
      });
};



// export const renderUsers = async (req, res) => {
//   const [rows] = await mySqlPool.query("SELECT * FROM user");
//   res.render("user", { users: rows });
// };

module.exports = {
  loadAuth,
  successGoogleLogin,
  failureGoogleLogin,
  register,
  googleLogout,
  listUsers
};
