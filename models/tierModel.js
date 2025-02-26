const db = require("../utils/database");
const md5 = require("md5");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class tierModel {
  static getTierById = async (args) => {
    const results = await db.query_new("select *from tiers where id=?", [
      args.id,
    ]);

    return results;
  };

  static getTierByPagination = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from tiers");
    const results = await db.query_new(
      "select *from tiers order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );
    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };
  static addTier = async (args) => {
    let name = args.name;
    let discount = args.discount;
    let minimum_val = args.minimum_val;
    let type = args.type;

    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let insert = await db.query_new(
      "insert into tiers (name,discount,minimum_val,type,created_at,updated_at) values(?,?,?,?,?,?)",
      [name, discount, minimum_val, type, created_at, created_at]
    );

    return insert;
  };

  static updateTier = async (args) => {
    let name = args.name;
    let discount = args.discount;
    let minimum_val = args.minimum_val;
    let type = args.type;
    let id = args.id;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let update = await db.query_new(
      `update tiers
                set name=?,
                discount=?,
                minimum_val=?,
                type=?,
                updated_at=?
                where id=?
                `,
      [name, discount, minimum_val, type, created_at, id]
    );

    return update;
  };
};
