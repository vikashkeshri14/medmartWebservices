const db = require("../utils/database");
const fs = require("fs");
const md5 = require("md5");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class userModel {
  static checkEmailPass(email, password) {
    let result = db.query_new(
      "select id,email,pharmacy_name,pharmacy_owner_name,whatsapp,phone,status from users where email=? and password=? and is_deleted!=1",
      [email, md5(password)]
    );
    return result;
  }
  static checkPassword = async (args) => {
    let result = db.query_new("select * from users where password=? and id=?", [
      md5(args.oldpassword),
      args.userId,
    ]);
    return result;
  };
  static changePassword = async (args) => {
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let result = db.query_new(
      "update users set password=?,updated_at=? where id=?",
      [md5(args.password), created_at, args.userId]
    );
    return result;
  };

  static checkEmail = async (args) => {
    if (args.hasOwnProperty("id") && args.id) {
      let result = db.query_new(
        "select * from users where email=? and id!=? and is_deleted!=1",
        [args.email, args.id]
      );
      return result;
    } else {
      let result = db.query_new(
        "select * from users where email=? and is_deleted!=1",
        [args.email]
      );
      return result;
    }
  };
  static checkPhone = async (args) => {
    if (args.hasOwnProperty("id") && args.id) {
      let result = db.query_new(
        "select * from users where phone=? and id!=? and is_deleted!=1",
        [args.phone, args.id]
      );
      return result;
    } else {
      let result = db.query_new(
        "select * from users where phone=? and is_deleted!=1",
        [args.phone]
      );
      return result;
    }
  };

  static checkWhatsaap = async (args) => {
    if (args.hasOwnProperty("id") && args.id) {
      let result = db.query_new(
        "select * from users where whatsapp=? and id!=? and is_deleted!=1",
        [args.whatsapp, args.id]
      );
      return result;
    } else {
      let result = db.query_new(
        "select * from users where whatsapp=? and is_deleted!=1",
        [args.whatsapp]
      );
      return result;
    }
  };
  static addUser = async (args) => {
    let pharmacy_name = args.pharmacy_name;
    let pharmacy_owner_name = args.pharmacy_owner_name;
    let whatsapp = args.whatsapp;
    let email = args.email;
    let phone = args.phone;

    let tax_no = args.tax_no;

    let pharmacy_type = args.pharmacy_type;
    let password = args.password;

    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let result = db.query_new(
      "insert into users (pharmacy_name,pharmacy_owner_name,whatsapp,email,phone,tax_no,pharmacy_type,password,created_at,updated_at) values(?,?,?,?,?,?,?,?,?,?)",
      [
        pharmacy_name,
        pharmacy_owner_name,
        whatsapp,
        email,
        phone,
        tax_no,
        pharmacy_type,
        md5(password),
        created_at,
        created_at,
      ]
    );

    return result;
  };
  static updateUser = async (args) => {
    let pharmacy_name = args.pharmacy_name;
    let pharmacy_owner_name = args.pharmacy_owner_name;
    let whatsapp = args.whatsapp;
    let email = args.email;
    let phone = args.phone;
    let tax_no = args.tax_no;
    let pharmacy_type = args.pharmacy_type;
    let password = args.password;
    let id = args.id;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
  };
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
