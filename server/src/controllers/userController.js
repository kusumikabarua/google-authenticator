const mySqlPool = require("../config/db");
const loadAuth = (req, res) => {
  res.render("auth");
};

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
      { "name": displayName, "email": email, "googleprofileid": id },
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
    const user = await mySqlPool.query("INSERT INTO users set ?", [userData]);
    res.status(201).json({
      message: "User Registered Successfully",
      userId: user.id,
    });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
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
