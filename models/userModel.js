const db = require("../utils/database");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class userModel {
  static insertContact = async (args) => {
    let name = args.name;
    let email = args.email;
    let phone = args.phone;
    let message = args.message;

    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let insert = await db.query_new(
      "insert into contacts (name,email,phone,message,created_at) values(?,?,?,?,?)",
      [name, email, phone, message, created_at]
    );

    return insert;
  };
  static subscribeInsert = async (args) => {
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let insert = await db.query_new(
      "insert into newsletters (email,created_at,updated_at) values(?,?,?)",
      [args.email, created_at, created_at]
    );

    return insert;
  };

  static checkSubscribe = async (email) => {
    let data = await db.query_new(
      "select email from newsletters where email=?",
      [email]
    );
    return data;
  };
};
