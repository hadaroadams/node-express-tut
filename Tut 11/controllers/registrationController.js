const Users = require("./../model/Users");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const dupilcate = await Users.findOne({ userName: user }).exec();
  if (dupilcate) return res.sendStatus(409);
  try {
    const hash = await bcrypt.hash(pwd, 10);
    const result = await Users.create({
      userName: user,
      password: hash,
    });
    console.log(result);
    res.status(201).json({ message: `User ${user} created successfully` });
  } catch (erro) {
    res.status(500).json({ message: erro.message });
  }
};

module.exports = { handleNewUser };
