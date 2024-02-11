const {whiteList} = require("./../config/whiteList");



const credentials = (req, res, next) => {
  const origin = req.header.origin;
  console.log(whiteList);
  if (whiteList.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
