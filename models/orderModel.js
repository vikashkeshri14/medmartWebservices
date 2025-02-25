const md5 = require("md5");
const db = require("../utils/database");
const Moment = require("moment-timezone");
module.exports = class orderModel {
  static addOrder(args) {
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let user_id = args.userId;
    let total = args.total;
    let subtotal = args.subtotal;
    let vat = args.vat;
    let shipping = args.shipping;
    let paymentType = args.paymentType;
    let rand = Math.random() * 100 + Moment();
    let token = md5(rand);

    let results = db.query_new(
      "insert orders (user_id,subtotal,vat,shipping,total,payment_type,token,created_at,updated_at) values(?,?,?,?,?,?,?,?,?)",
      [
        user_id,
        subtotal,
        vat,
        shipping,
        total,
        paymentType,
        token,
        created_at,
        created_at,
      ]
    );
    return results;
  }

  static addOrderItems(orderId, args) {
    let created = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    let results = db.query_new(
      "insert order_items (order_id,drug_id,price,quantity,created_at,updated_at) values(?,?,?,?,?,?)",
      [orderId, args.drugId, args.price, args.quantity, created, created]
    );
    return results;
  }

  static getAllOrder = async (args) => {
    const cnt = await db.query_new(`select count(id) as cnt from orders`);
    const results = await db.query_new(
      `select o.* from orders as o order by o.id desc limit ?,?`,
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );

    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };

  static getOrderByUserId = async (args) => {
    const cnt = await db.query_new(
      `select count(id) as cnt from orders as o where user_id=?`,
      [args.user_id]
    );
    const results = await db.query_new(
      `select o.* from orders as o where o.user_id=?  order by o.id desc limit ?,?`,
      [
        args.user_id,
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

  static getOrderById = async (args) => {
    const results = await db.query_new(
      `select o.* from orders as o where o.id=?`,
      [args.order_id]
    );

    const items = await db.query_new(
      `select o.*,d.name,d.name_ar,d.image_url,d.category,d.category_ar from order_items as o,drugs as d  where d.id=o.drug_id and  o.order_id=? `,
      [args.order_id]
    );

    const obj = {
      order: results,
      items: items,
    };
    return obj;
  };

  static getOrderByToken = async (args) => {
    const results = await db.query_new(
      `select o.* from orders as o where o.token=?`,
      [args.token]
    );

    const items = await db.query_new(
      `select oi.*,d.name,d.name_ar,d.image_url,d.category,d.category_ar from order_items as oi,orders as o,drugs as d  where o.id=oi.order_id and d.id=oi.drug_id and  o.token=? `,
      [args.token]
    );

    const obj = {
      order: results,
      items: items,
    };
    return obj;
  };
};
