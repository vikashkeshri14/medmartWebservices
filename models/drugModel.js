const db = require("../utils/database");
const md5 = require("md5");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class projectModel {
  static getDrugById = async (args) => {
    // console.log("select *from drugs where id=?", [args.id]);
    const results = db.query_new("select *from drugs where id=?", [args.id]);
    return results;
  };
  static getrandomDrugByCat = async (args) => {
    const results = await db.query_new(
      "SELECT * FROM drugs where category_slug=? ORDER BY RAND() LIMIT 8",
      [args.slug]
    );

    return results;
  };

  static getDrugByKey = async (args) => {
    const results = db.query_new(
      `select *from drugs where name like "%${args.key}%" or name_ar like "%${args.key}%" or category_slug like "%${args.key}%" order by name,name_ar limit 0,5 `
    );
    return results;
  };

  static getDrugByPagination = async (args) => {
    if (
      args.hasOwnProperty("key") &&
      args.key.trim() != "" &&
      args.hasOwnProperty("sortBy") &&
      args.sortBy
    ) {
      const cnt = await db.query_new(
        `select count(id) as cnt from drugs where name like "%${args.key}%" or name_ar like "%${args.key}%" or category_slug like "%${args.key}%"`
      );
      if (args.sortBy == "1") {
        const results = await db.query_new(
          `select d.* , h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where d.name like "%${args.key}%" or d.name_ar like "%${args.key}%" or d.category_slug like "%${args.key}% order by price  limit ?,?`,
          [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
        );

        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      } else {
        const results = await db.query_new(
          `select d.* , h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where d.name like "%${args.key}%" or d.name_ar like "%${args.key}%" or d.category_slug like "%${args.key}%" order by d.price desc limit ?,?`,
          [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
        );

        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      }
    } else if (args.hasOwnProperty("key") && args.key.trim() != "") {
      const cnt = await db.query_new(
        `select count(id) as cnt from drugs where name like "%${args.key}%" or name_ar like "%${args.key}%" or category_slug like "%${args.key}%"`
      );
      const results = await db.query_new(
        `select d.* , h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where d.name like "%${args.key}%" or d.name_ar like "%${args.key}%" or d.category_slug like "%${args.key}%" order by d.id desc limit ?,?`,
        [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
      );

      const obj = {
        totalPage: cnt[0].cnt,
        data: results,
      };
      return obj;
    } else if (args.hasOwnProperty("sortBy") && args.sortBy.trim() != "") {
      const cnt = await db.query_new("select count(id) as cnt from drugs");

      if (args.sortBy == "1") {
        const results = await db.query_new(
          "select d.*,h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  order by d.price  limit ?,?",
          [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
        );

        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      } else {
        const results = await db.query_new(
          "select d.*,h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  order by d.price desc limit ?,?",
          [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
        );

        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      }
    } else {
      const cnt = await db.query_new("select count(id) as cnt from drugs");
      const results = await db.query_new(
        "select d.*,h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  order by d.id desc limit ?,?",
        [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
      );

      const obj = {
        totalPage: cnt[0].cnt,
        data: results,
      };
      return obj;
    }
  };

  static getDrugByPaginationByAllFilter = async (args) => {
    const cnt = await db.query_new(
      `select count(id) as cnt from drugs where (name like "%${args.key}%" or name_ar like "%${args.key}%" or category_slug like "%${args.key}%") and category_slug in (?)`,
      [args.categories]
    );
    if (args.sortBy == "1") {
      const results = await db.query_new(
        `select d.* , h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where (d.name like "%${args.key}%" or d.name_ar like "%${args.key}%" or d.category_slug like "%${args.key}%") and d.category_slug in (?) order by d.price  limit ?,?`,
        [
          args.categories,
          (args.currentPage - 1) * args.postsPerPage,
          args.postsPerPage,
        ]
      );

      const obj = {
        totalPage: cnt[0].cnt,
        data: results,
      };
      return obj;
    } else {
      const results = await db.query_new(
        `select d.* , h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where (d.name like "%${args.key}%" or d.name_ar like "%${args.key}%" or d.category_slug like "%${args.key}%") and d.category_slug in (?) order by d.price desc limit ?,?`,
        [
          args.categories,
          (args.currentPage - 1) * args.postsPerPage,
          args.postsPerPage,
        ]
      );

      const obj = {
        totalPage: cnt[0].cnt,
        data: results,
      };
      return obj;
    }
  };

  static getDrugByPaginationKeyCat = async (args) => {
    const cnt = await db.query_new(
      `select count(id) as cnt from drugs where (name like "%${args.key}%" or name_ar like "%${args.key}%" or category_slug like "%${args.key}%") and category_slug in (?)`,
      [args.categories]
    );
    const results = await db.query_new(
      `select d.*,h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where (d.name like "%${args.key}%" or d.name_ar like "%${args.key}%" or d.category_slug like "%${args.key}%" ) and  d.category_slug in (?) order by d.id desc limit ?,?`,
      [
        args.categories,
        (args.currentPage - 1) * args.postsPerPage,
        args.postsPerPage,
      ]
    );

    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };

  static getDrugByPaginationSortCat = async (args) => {
    const cnt = await db.query_new(
      `select count(id) as cnt from drugs where category_slug in (?)`,
      [args.categories]
    );
    if (args.sortBy == "1") {
      const results = await db.query_new(
        `select d.* , h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where d.category_slug in (?) order by d.price  limit ?,?`,
        [
          args.categories,
          (args.currentPage - 1) * args.postsPerPage,
          args.postsPerPage,
        ]
      );

      const obj = {
        totalPage: cnt[0].cnt,
        data: results,
      };
      return obj;
    } else {
      const results = await db.query_new(
        `select d.* , h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where d.category_slug in (?) order by d.price desc limit ?,?`,
        [
          args.categories,
          (args.currentPage - 1) * args.postsPerPage,
          args.postsPerPage,
        ]
      );

      const obj = {
        totalPage: cnt[0].cnt,
        data: results,
      };
      return obj;
    }
  };

  static getDrugByPaginationCat = async (args) => {
    //console.log("args", args);
    const cnt = await db.query_new(
      "select count(id) as cnt from drugs where category_slug in (?)",
      [args.categories]
    );
    const results = await db.query_new(
      "select d.*,h.id as hotdeal, b.id as bestdeal from drugs as d left join hotdeals as h on h.drug_id=d.id left join bestselling as b on b.drug_id=d.id  where d.category_slug in (?) order by d.id desc limit ?,?",
      [
        args.categories,
        (args.currentPage - 1) * args.postsPerPage,
        args.postsPerPage,
      ]
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

  static addDrug = async (args) => {
    //console.log(args);
    //return;
    let url = "http://localhost:3020/";
    let name = args.name;
    //let slug = args.name.replace(/ /g, "-").toLowerCase();
    let name_ar = args.name_ar;
    let description = args.description;
    let description_ar = args.description_ar;
    let price = args.price;
    let stock = args.stock;
    let category_slug = args.category;
    let catDetails = await db.query_new(
      "select * from categories where slug=?",
      [args.category]
    );
    // console.log("select * from categories where slug=?", [args.category]);
    //console.log(catDetails);
    //return 1;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let profile = "";
    let category = catDetails[0].name;
    let category_ar = catDetails[0].name_ar;

    if (args.images.length > 0) {
      let pdf_url = "img-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "drugs");
      let profile_url = uploaddir + "/" + pdf_url;
      profile = "drugs/" + pdf_url;
      fs.access(uploaddir, function (error) {
        //console.log(args.projectMainImages.length);
        fs.writeFile(
          profile_url,
          args.images[0],
          { encoding: "base64" },
          (err) => {}
        );
        // console.log("Directory exists.");
      });
    }

    let insert = await db.query_new(
      "insert into drugs (name,name_ar,description,description_ar,price,stock,category_slug,category,category_ar,image_url,created_at,updated_at) values(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        name_ar,
        description,
        description_ar,
        price,
        stock,
        category_slug,
        category,
        category_ar,
        url + "" + profile,
        created_at,
        created_at,
      ]
    );

    return insert;
  };

  static updateDrug = async (args) => {
    let url = "http://localhost:3020/";
    let id = args.id;
    let name = args.name;
    let name_ar = args.name_ar;
    let description = args.description;
    let description_ar = args.description_ar;
    let price = args.price;
    let stock = args.stock;
    let category_slug = args.category;
    let catDetails = await db.query_new(
      "select * from categories where slug=?",
      [args.category]
    );
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let profile = "";
    let category = catDetails[0].name;
    let category_ar = catDetails[0].name_ar;
    if (args.images.length > 0) {
      let pdf_url = "img-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "drugs");
      let profile_url = uploaddir + "/" + pdf_url;
      profile = "drugs/" + pdf_url;
      fs.access(uploaddir, function (error) {
        fs.writeFile(
          profile_url,
          args.images[0],
          { encoding: "base64" },
          (err) => {}
        );
      });
      await db.query_new(
        `update drugs
            set images=? where id=?`,
        [url + "" + profile, id]
      );
    }

    let update = await db.query_new(
      `update drugs
          set name=?,
              name_ar=?,
              description=?,
              description_ar=?,
              category_slug=?,
              category=?,
              category_ar=?,
              price=?,
              stock=?,
              updated_at=?
          where id=?
          `,
      [
        name,
        name_ar,
        description,
        description_ar,
        category_slug,
        category,
        category_ar,
        price,
        stock,
        created_at,
        id,
      ]
    );

    return update;
  };

  static removeHotdeal = async (args) => {
    let id = args.id;

    let deletes = await db.query_new("delete from hotdeals where drug_id=?", [
      id,
    ]);

    return deletes;
  };

  static removeBestselling = async (args) => {
    let id = args.id;
    let deletes = await db.query_new(
      "delete from bestselling where drug_id=?",
      [id]
    );

    return deletes;
  };

  static addBestselling = async (args) => {
    let id = args.id;

    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let insert = await db.query_new(
      "insert into bestselling (drug_id,created_at) values(?,?)",
      [id, created_at]
    );

    return insert;
  };
  static addHotdeal = async (args) => {
    let id = args.id;

    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let insert = await db.query_new(
      "insert into hotdeals (drug_id,created_at) values(?,?)",
      [id, created_at]
    );

    return insert;
  };
  static getHotdeal = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from hotdeals");
    const results = await db.query_new(
      "select d.* from hotdeals as h , drugs as d where h.drug_id=d.id order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );

    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };

  static getBestselling = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from bestselling");
    const results = await db.query_new(
      "select d.* from bestselling as b , drugs as d where b.drug_id=d.id order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );

    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };
};
