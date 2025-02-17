const db = require("../utils/database");
const md5 = require("md5");
const Moment = require("moment-timezone");
module.exports = class adminModel {
  static checkEmailPass(email, password) {
    let result = db.query_new(
      "select id,email,name,status from admins where email=? and password=?",
      [email, md5(password)]
    );
    return result;
  }

  static addAdmin = async (args) => {
    let name = args.name;
    let email = args.email;
    let phone = args.phone;
    let types = args.type;
    let password = args.password;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let res = db.query_new(
      "insert into admins (name,email,phone,role,password,created_at,updated_at) values(?,?,?,?,?,?,?)",
      [name, email, phone, types, md5(password), created_at, created_at]
    );

    return res;
  };
  static updateAdmin = async (args) => {
    let name = args.name;
    let email = args.email;
    let phone = args.phone;
    let types = args.type;
    let password = args.password;
    let id = args.id;

    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let res = db.query_new(
      "update admins set name=?,email=?,phone=?,role=?,password=?,updated_at=? where id=?",
      [name, email, phone, types, md5(password), created_at, id]
    );
    return res;
  };

  static checkEmail = async (args) => {
    if (args.hasOwnProperty("id") && args.id) {
      let result = db.query_new(
        "select * from admins where email=? and id!=?",
        [args.email, args.id]
      );
      return result;
    } else {
      let result = db.query_new("select * from admins where email=?", [
        args.email,
      ]);
      return result;
    }
  };
  static checkPhone = async (args) => {
    if (args.hasOwnProperty("id") && args.id) {
      let result = db.query_new(
        "select * from admins where phone=? and id!=?",
        [args.phone, args.id]
      );
      return result;
    } else {
      let result = db.query_new("select * from admins where phone=?", [
        args.phone,
      ]);
      return result;
    }
  };

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
