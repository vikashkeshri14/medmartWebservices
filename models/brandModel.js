const db = require("../utils/database");
const md5 = require("md5");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class brandModel {
  static getBrandById = async (args) => {
    const results = await db.query_new("select *from brands where id=?", [
      args.id,
    ]);

    return results;
  };

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

  static getBrand = async (args) => {
    //const cnt = await db.query_new("select count(id) as cnt from brands");
    const results = await db.query_new("select *from brands");

    return results;
  };

  static addBrand = async (args) => {
    let name = args.name;
    let slug = args.name.replace(/ /g, "-").toLowerCase();
    let name_ar = args.name_ar;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let profile = "";

    if (args.images.length > 0) {
      let pdf_url = "img-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "brands");
      let profile_url = uploaddir + "/" + pdf_url;
      profile = "brands/" + pdf_url;
      fs.access(uploaddir, function (error) {
        //console.log(args.projectMainImages.length);
        fs.writeFile(
          profile_url,
          args.images[0],
          { encoding: "base64" },
          (err) => {}
        );
        console.log("Directory exists.");
      });
    }

    let insert = await db.query_new(
      "insert into brands (slug,name,name_ar,images,created_at) values(?,?,?,?,?)",
      [slug, name, name_ar, profile, created_at]
    );

    return insert;
  };

  static updateBrand = async (args) => {
    let name = args.name;
    let name_ar = args.name_ar;
    let id = args.id;
    let profile = "";
    if (args.images.length > 0) {
      let pdf_url = "img-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "brands");
      let profile_url = uploaddir + "/" + pdf_url;
      profile = "brands/" + pdf_url;
      fs.access(uploaddir, function (error) {
        fs.writeFile(
          profile_url,
          args.images[0],
          { encoding: "base64" },
          (err) => {}
        );
      });
      await db.query_new(
        `update brands
            set images=? where id=?`,
        [profile, id]
      );
    }

    let update = await db.query_new(
      `update brands
          set name=?,
          name_ar=?
          where id=?
          `,
      [name, name_ar, id]
    );

    return update;
  };
};
