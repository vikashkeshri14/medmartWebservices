const db = require("../utils/database");
const md5 = require("md5");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class projectModel {
  static getDrugById = async (args) => {
    const results = db.query_new("select *from drugs where id=? ", [args.id]);
    return results;
  };

  static getDrugByPagination = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from drugs");
    const results = await db.query_new(
      "select *from drugs order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );

    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };

  static importDrugs = async (args) => {
    //console.log(args);
    //return;
    let datas = args.data;
    //let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    if (datas.length > 0) {
      datas.map(async (data, i) => {
        //console.log(data.category);
        //return
        await db.query_new(
          "insert into drugs (name,name_ar,price,image_url,status,category,category_ar,category_slug,created_at,updated_at) values(?,?,?,?,?,?,?,?,?,?)",
          [
            data.name ? data.name : "",
            data.name_ar ? data.name_ar : "",
            data.price ? data.price : "",
            data.image_url ? data.image_url : "",
            data.status ? data.status : "",
            data.category ? data.category : "",
            data.category_ar ? data.category_ar : "",
            data.category ? data.category.replace(/ /g, "-").toLowerCase() : "",
            data.created_at
              ? Moment(data.created_at)
                  .tz("Asia/Riyadh")
                  .format("YYYY-MM-DD HH:mm:ss")
              : "",
            data.updated_at
              ? Moment(data.updated_at)
                  .tz("Asia/Riyadh")
                  .format("YYYY-MM-DD HH:mm:ss")
              : "",
          ]
        );
      });
    }

    return 1;
  };
};
