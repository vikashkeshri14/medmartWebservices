const db = require("../utils/database");
const md5 = require("md5");
module.exports = class adminModel {
  static checkEmailPass(email, password) {
    //console.log(md5(password));
    let result = db.query_new(
      "select id,email,name,status from admins where email=? and password=?",
      [email, md5(password)]
    );
    return result;
  }

  static getAdminListPagination = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from admins");
    const results = await db.query_new(
      "select *from admins order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );
    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };
};
