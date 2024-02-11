const userDB = {
  users: require("./../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const dupilcate = userDB.users.find((person) => person.userName === user);
  if (dupilcate) return res.sendStatus(409);
  try {
    const hash = await bcrypt.hash(pwd, 10);
    const newUser = { userName: user, roles: { User: 2 }, password: hash };
    userDB.setUsers([...userDB.users, newUser]);
    console.log({ user: userDB.users, hash });
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.status(201).json({ message: `User ${user} created successfully` });
  } catch (erro) {
    res.status(500).json({ message: erro.message });
  }
};

module.exports = { handleNewUser };
