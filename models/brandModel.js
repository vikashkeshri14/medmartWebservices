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

  static addBrand = async (args) => {
    let name = args.name;
    let name_ar = args.name_ar;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let profile = "";

    if (args.images.length > 0) {
      let pdf_url = "pdf-" + new Date().getTime() + ".pdf";
      let uploaddir = path.join("uploads", "projects");
      let profile_url = uploaddir + "/" + pdf_url;
      profile = "projects/" + pdf_url;
      fs.access(uploaddir, function (error) {
        //console.log(args.projectMainImages.length);
        fs.writeFile(
          profile_url,
          args.profile[0],
          { encoding: "base64" },
          (err) => {}
        );
        console.log("Directory exists.");
      });
    }

    let insert = await db.query_new(
      "insert into projects (slug,name,name_ar,images,created_at) values(?,?,?,?)",
      [slug, name, name_ar, profile, created_at]
    );

    return insert;
  };

  static updateBrand = async (args) => {
    let name = args.name;
    let name_ar = args.name_ar;
    let id = args.id;
    if (args.images.length > 0) {
      let pdf_url = "pdf-" + new Date().getTime() + ".pdf";
      let uploaddir = path.join("uploads", "projects");
      let profile_url = uploaddir + "/" + pdf_url;
      profile = "projects/" + pdf_url;
      fs.access(uploaddir, function (error) {
        fs.writeFile(
          profile_url,
          args.profile[0],
          { encoding: "base64" },
          (err) => {}
        );
      });
      await db.query_new(
        `update projects
            set profile_link=? where id=?`,
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
