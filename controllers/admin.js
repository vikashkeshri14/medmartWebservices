const adminModel = require("../models/adminModel");
module.exports = class userControllers {
  static loginAdmin = async (req, res, next) => {
    try {
      if (req.body.email && req.body.password) {
        let data = req.body;
        const email = data.email;
        const password = data.password;

        const [email_check] = await adminModel.checkEmailPass(email, password);

        if (email_check) {
          const obj = {
            message: "Successfully logged in ",
            results: email_check,
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "Username or password entered wrong!",
            result: [],
            status: false,
          };
          //console.log(obj);
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };
};
