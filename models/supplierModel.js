const db = require("../utils/database");
const md5 = require("md5");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class supplierModel {
  static getSupplierById = async (args) => {
    const results = await db.query_new("select *from suppliers where id=?", [
      args.id,
    ]);

    return results;
  };

  static getSupplierByPagination = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from suppliers");
    const results = await db.query_new(
      "select s.name,s.name_ar,s.address,s.phone,s.tier,s.givernment,s.warehouse_city,s.coverage_cities,a.name as updated_by from suppliers as s , admins as a where a.id=s.user_id order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );
    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };
  static addSupplier = async (args) => {
    let name = args.name;
    let name_ar = args.name_ar;
    let password = md5(args.password);
    let address = args.address;
    let phone = args.phone;
    let tier = args.tier;
    let government = args.government;
    let warehouse_city = args.warehouse_city;
    let coverage_cities = args.coverage_cities;
    let updated_by = args.updated_by;

    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let insert = await db.query_new(
      "insert into suppliers (name,name_ar,password,address,phone,tier,government,warehouse_city,coverage_cities,updated_by,created_at,updated_at) values(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        name_ar,
        password,
        address,
        phone,
        tier,
        government,
        warehouse_city,
        coverage_cities,
        updated_by,
        created_at,
        created_at,
      ]
    );

    return insert;
  };

  static updateSupplier = async (args) => {
    let name = args.name;
    let name_ar = args.name_ar;
    let password = md5(args.password);
    let address = args.address;
    let phone = args.phone;
    let tier = args.tier;
    let government = args.government;
    let warehouse_city = args.warehouse_city;
    let coverage_cities = args.coverage_cities;
    let updated_by = args.updated_by;
    let id = args.id;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    if (password) {
      let update = await db.query_new(
        `update suppliers
        set name=?,
        name_ar=?,
        password=?,
        address=?,
        phone=?,
        tier=?,
        government=?,
        warehouse_city=?,
        coverage_cities=?,
        updated_by=?,
        updated_at=?
        where id=?
            `,
        [
          name,
          name_ar,
          password,
          address,
          phone,
          tier,
          government,
          warehouse_city,
          coverage_cities,
          updated_by,
          created_at,
          id,
        ]
      );

      return update;
    } else {
      let update = await db.query_new(
        `update suppliers
        set name=?,
        name_ar=?,
        address=?,
        phone=?,
        tier=?,
        government=?,
        warehouse_city=?,
        coverage_cities=?,
        updated_by=?,
        updated_at=?
        where id=?
                      `,
        [
          name,
          name_ar,
          address,
          phone,
          tier,
          government,
          warehouse_city,
          coverage_cities,
          updated_by,
          created_at,
          id,
        ]
      );

      return update;
    }
  };
};
