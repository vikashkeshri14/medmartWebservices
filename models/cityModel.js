const db = require("../utils/database");
const md5 = require("md5");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class cityModel {
  static getCityById = async (args) => {
    const results = await db.query_new("select *from cities where id=?", [
      args.id,
    ]);

    return results;
  };

  static getCityByPagination = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from cities");
    const results = await db.query_new(
      "select *from cities order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );
    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };
  static addCity = async (args) => {
    let name = args.name;
    let name_ar = args.name_ar;
    let governate = args.governate;

    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let insert = await db.query_new(
      "insert into cities (name,name_ar,governate,created_at) values(?,?,?,?)",
      [name, name_ar, governate, created_at]
    );

    return insert;
  };

  static updateCity = async (args) => {
    let name = args.name;
    let name_ar = args.name_ar;
    let governate = args.governate;
    let id = args.id;

    let update = await db.query_new(
      `update cities
            set name=?,
            name_ar=?,
            governate=?
            where id=?
            `,
      [name, name_ar, governate, id]
    );

    return update;
  };
};
