const db = require("../utils/database");
const md5 = require("md5");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class projectModel {
  static getBrandByPagination = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from brands");
    const results = await db.query_new(
      "select *from brands order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );
    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };
};
