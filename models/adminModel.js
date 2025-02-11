const db = require("../utils/database");
const md5 = require("md5");
module.exports = class adminModel {
  static checkEmailPass(email, password) {
    //console.log(md5(password));
    let result = db.query_new(
      "select id,email,name,status from users where email=? and password=?",
      [email, md5(password)]
    );
    return result;
  }
};
