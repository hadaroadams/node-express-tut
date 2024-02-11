const Users = require('./../model/Users')



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogIn = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  console.log(req.body);

  const isUserExiting =Users.findOne({userName:user});
  if (!isUserExiting) return res.sendStatus(401);

  const isMatch = await bcrypt.compare(pwd, isUserExiting.password);
  if (isMatch) {
    const roles = Object.values(isUserExiting.roles);
    // Create jwts
    const accessToken = jwt.sign(
      { UserInfo: {username: isUserExiting.userName, roles}},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refeshToken = jwt.sign(
      { username: isUserExiting.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    console.log(accessToken, refeshToken);
    const otherUsers = Users.find().filter(
      (person) => person.userName !== isUserExiting.userName
    );
    const currentUser = { ...isUserExiting, refeshToken };
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.cookie("jwt", refeshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
    console.log("Done");
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogIn };
