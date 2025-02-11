const db = require("../utils/database");
const md5 = require("md5");
const fs = require("fs");
const Moment = require("moment-timezone");
const path = require("path");
module.exports = class projectModel {
  static projectDelete = async (args) => {
    const results = db.query_new("delete from project_images where id=?", [
      args.id,
    ]);
    return results;
  };
  static getProjects = async () => {
    const results = db.query_new("select *from projects order by id desc");
    return results;
  };

  static getProjectById = async (args) => {
    const results = db.query_new("select *from projects where id=? ", [
      args.id,
    ]);
    return results;
  };
  static getCategoryById = async (args) => {
    const results = db.query_new("select *from blogcategories where id=? ", [
      args.id,
    ]);
    return results;
  };

  static getProjectImageByCode = async (args) => {
    const results = db.query_new(
      "select *from project_images where project_code=?",
      [args.code]
    );
    return results;
  };
  static getProjectByCode = async (args) => {
    const results = db.query_new("select *from projects where code=?", [
      args.code,
    ]);
    return results;
  };
  static getProjectsByPagination = async (args) => {
    if (
      args.hasOwnProperty("city") ||
      args.hasOwnProperty("district") ||
      args.hasOwnProperty("area")
    ) {
      if (
        args.hasOwnProperty("city") &&
        args.city != "" &&
        args.hasOwnProperty("area") &&
        args.area != "" &&
        args.hasOwnProperty("district") &&
        args.district != ""
      ) {
        console.log(
          "select count(id) as cnt from projects where city=? and area=? and district=?",
          [args.city, args.area, args.district]
        );
        const cnt = await db.query_new(
          "select count(id) as cnt from projects where city=? and area=? and district=?",
          [args.city, args.area, args.district]
        );
        const results = await db.query_new(
          "select *from projects where city=? and area=? and district=? order by id desc limit ?,?",
          [
            args.city,
            args.area,
            args.district,
            (args.currentPage - 1) * args.postsPerPage,
            args.postsPerPage,
          ]
        );
        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      } else if (
        args.hasOwnProperty("city") &&
        args.city != "" &&
        args.hasOwnProperty("area") &&
        args.area != ""
      ) {
        const cnt = await db.query_new(
          "select count(id) as cnt from projects where city=? and area=? ",
          [args.city, args.area]
        );
        const results = await db.query_new(
          "select *from projects where city=? and area=? order by id desc limit ?,?",
          [
            args.city,
            args.area,
            (args.currentPage - 1) * args.postsPerPage,
            args.postsPerPage,
          ]
        );
        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      } else if (
        args.hasOwnProperty("city") &&
        args.city != "" &&
        args.hasOwnProperty("district") &&
        args.district != ""
      ) {
        const cnt = await db.query_new(
          "select count(id) as cnt from projects where city=? and district=?",
          [args.city, args.district]
        );
        const results = await db.query_new(
          "select *from projects where city=? and district=? order by id desc limit ?,?",
          [
            args.city,
            args.district,
            (args.currentPage - 1) * args.postsPerPage,
            args.postsPerPage,
          ]
        );
        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      } else if (
        args.hasOwnProperty("district") &&
        args.district != "" &&
        args.hasOwnProperty("area") &&
        args.area != ""
      ) {
        const cnt = await db.query_new(
          "select count(id) as cnt from projects where area=? and district=?",
          [args.area, args.district]
        );
        const results = await db.query_new(
          "select *from projects where area=? and district=? order by id desc limit ?,?",
          [
            args.area,
            args.district,
            (args.currentPage - 1) * args.postsPerPage,
            args.postsPerPage,
          ]
        );
        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      } else if (args.hasOwnProperty("district") && args.district != "") {
        const cnt = await db.query_new(
          "select count(id) as cnt from projects where district=?",
          [args.district]
        );
        const results = await db.query_new(
          "select *from projects where district=? order by id desc limit ?,?",
          [
            args.district,
            (args.currentPage - 1) * args.postsPerPage,
            args.postsPerPage,
          ]
        );
        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      } else if (args.hasOwnProperty("city") && args.city != "") {
        const cnt = await db.query_new(
          "select count(id) as cnt from projects where city=?",
          [args.city]
        );
        const results = await db.query_new(
          "select *from projects where city=? order by id desc limit ?,?",
          [
            args.city,
            (args.currentPage - 1) * args.postsPerPage,
            args.postsPerPage,
          ]
        );
        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      } else if (args.hasOwnProperty("area") && args.area != "") {
        const cnt = await db.query_new(
          "select count(id) as cnt from projects where area=?",
          [args.area]
        );
        const results = await db.query_new(
          "select *from projects where area=? order by id desc limit ?,?",
          [
            args.area,
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
        const cnt = await db.query_new("select count(id) as cnt from projects");
        const results = await db.query_new(
          "select *from projects order by id desc limit ?,?",
          [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
        );
        const obj = {
          totalPage: cnt[0].cnt,
          data: results,
        };
        return obj;
      }
    } else {
      const cnt = await db.query_new("select count(id) as cnt from projects");
      const results = await db.query_new(
        "select *from projects order by id desc limit ?,?",
        [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
      );
      const obj = {
        totalPage: cnt[0].cnt,
        data: results,
      };
      return obj;
    }
  };
  static getCategoriesByPagination = async (args) => {
    const cnt = await db.query_new(
      "select count(id) as cnt from blogcategories"
    );
    const results = await db.query_new(
      "select *from blogcategories order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );

    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };
  static insertProject = async (args) => {
    let projectname = args.projectname;
    let profile = "";
    let projectcode = args.projectcode;
    let projectdescription = args.projectdescription;
    let projectdescriptionar = args.projectdescriptionar;
    let projectnamear = args.projectnamear;
    let projectlocation = args.projectlocation;
    let projectlocationar = args.projectlocationar;
    let twitter = args.twitter;
    let facebook = args.facebook;
    let snapchat = args.snapchat;
    let instagram = args.instagram;
    let googleLocation = args.googleLocation;
    let unit = args.unit;
    let building = args.building;
    let projectMainImages = "";
    let videourl = args.videourl;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");

    if (args.projectMainImages.length > 0) {
      let png_url = "main-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "projects");
      let path_url = uploaddir + "/" + png_url;
      projectMainImages = "projects/" + png_url;
      fs.access(uploaddir, function (error) {
        //console.log(args.projectMainImages.length);
        fs.writeFile(
          path_url,
          args.projectMainImages[0],
          { encoding: "base64" },
          (err) => {}
        );
        console.log("Directory exists.");
      });
    }

    if (args.profile.length > 0) {
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
      "insert into projects (code,project_name,project_location,project_description,buildings,units,project_map_location,project_name_ar,project_location_ar,project_description_ar,images,profile_link,facebook,twitter,instagram,snapchat,video_url,created_at) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        projectcode,
        projectname,
        projectlocation,
        projectdescription,
        building,
        unit,
        googleLocation,
        projectnamear,
        projectlocationar,
        projectdescriptionar,
        projectMainImages,
        profile,
        facebook,
        twitter,
        instagram,
        snapchat,
        videourl,
        created_at,
      ]
    );

    //console.log(insert);

    if (args.images.length > 0) {
      args.images.map((data) => {
        console.log(args.images.length);
        let png_url =
          "sub-" +
          Math.ceil(Math.random() * 100) +
          new Date().getTime() +
          ".jpeg";
        let uploaddir = path.join("uploads", "projects");
        let path_url = uploaddir + "/" + png_url;
        let profile_image_url = "projects/" + png_url;
        fs.access(uploaddir, function (error) {
          fs.writeFile(path_url, data, { encoding: "base64" }, (err) => {});
          let insertimages = db.query_new(
            "insert into project_images (project_code,images,created_at) values(?,?,?)",
            [projectcode, profile_image_url, created_at]
          );
          //console.log("Directory exists.");
        });
      });
    }
    return insert;
  };

  static updateProject = async (args) => {
    let projectname = args.projectname;
    let profile = "";
    let projectcode = args.projectcode;
    let projectdescription = args.projectdescription;
    let projectdescriptionar = args.projectdescriptionar;
    let projectnamear = args.projectnamear;
    let projectlocation = args.projectlocation;
    let projectlocationar = args.projectlocationar;
    let twitter = args.twitter;
    let facebook = args.facebook;
    let snapchat = args.snapchat;
    let instagram = args.instagram;
    let googleLocation = args.googleLocation;
    let unit = args.unit;
    let building = args.building;
    let projectMainImages = "";
    let videourl = args.videourl;
    let email = args.email;
    let phone = args.phone;
    let id = args.id;
    if (args.projectMainImages.length > 0) {
      let png_url = "main-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "projects");
      let path_url = uploaddir + "/" + png_url;
      projectMainImages = "projects/" + png_url;
      fs.access(uploaddir, function (error) {
        fs.writeFile(
          path_url,
          args.projectMainImages[0],
          { encoding: "base64" },
          (err) => {}
        );
      });
      await db.query_new(
        `update projects
          set images=? where id=?`,
        [projectMainImages, id]
      );
    }

    if (args.profile.length > 0) {
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
      `update projects
        set project_name=?,
        project_location=?,
        project_description=?,
        buildings=?,
        units=?,
        project_map_location=?,
        project_name_ar=?,
        project_location_ar=?,
        project_description_ar=?,
        facebook=?,
        twitter=?,
        instagram=?,
        snapchat=?,
        video_url=?,
        phone=?,
        email=?
        where id=?
        `,
      [
        projectname,
        projectlocation,
        projectdescription,
        building,
        unit,
        googleLocation,
        projectnamear,
        projectlocationar,
        projectdescriptionar,
        facebook,
        twitter,
        instagram,
        snapchat,
        videourl,
        phone,
        email,
        id,
      ]
    );
    console.log(update);

    if (args.images.length > 0) {
      args.images.map((data) => {
        console.log(args.images.length);
        let png_url =
          "sub-" +
          Math.ceil(Math.random() * 100) +
          new Date().getTime() +
          ".jpeg";
        let uploaddir = path.join("uploads", "projects");
        let path_url = uploaddir + "/" + png_url;
        let profile_image_url = "projects/" + png_url;
        fs.access(uploaddir, function (error) {
          fs.writeFile(path_url, data, { encoding: "base64" }, (err) => {});
          db.query_new(
            "insert into project_images (project_code,images,created_at) values(?,?,?)",
            [projectcode, profile_image_url, created_at]
          );
          //console.log("Directory exists.");
        });
      });
    }
    return update;
  };

  static addCategory = async (args) => {
    let name = args.name;
    let name_ar = args.namear;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let images = "";
    if (args.images.length > 0) {
      let png_url = "main-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "projects");
      let path_url = uploaddir + "/" + png_url;
      images = "projects/" + png_url;
      fs.access(uploaddir, function (error) {
        //console.log(args.projectMainImages.length);
        fs.writeFile(
          path_url,
          args.images[0],
          { encoding: "base64" },
          (err) => {}
        );
        console.log("Directory exists.");
      });
    }

    let insert = await db.query_new(
      "insert into blogcategories (name,name_ar,images,created_at,updated_at) values(?,?,?,?,?)",
      [name, name_ar, images, created_at, created_at]
    );
    return insert;
  };

  static updateCategory = async (args) => {
    let name = args.name;
    let name_ar = args.namear;
    let id = args.id;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let images = "";
    //console.log(args.images);
    if (args.images.length > 0) {
      let png_url = "main-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "projects");
      let path_url = uploaddir + "/" + png_url;
      images = "projects/" + png_url;
      fs.access(uploaddir, function (error) {
        fs.writeFile(
          path_url,
          args.images[0],
          { encoding: "base64" },
          (err) => {}
        );
        console.log("Directory exists.");
      });
      await db.query_new("update blogcategories set images=? where id=?", [
        images,
        id,
      ]);
    }

    let update = await db.query_new(
      "update blogcategories set name=?,name_ar=?,updated_at=? where id=?",
      [name, name_ar, created_at, id]
    );
    return update;
  };
  static getAllCategory = async (args) => {
    const results = db.query_new(
      "select *from blogcategories  order by name  "
    );
    return results;
  };
  static addPost = async (args) => {
    let title = args.title;
    let description = args.description;
    let categories = args.categories;
    let title_ar = args.titleAr;
    let description_ar = args.descriptionAr;
    let categories_ar = args.categoriesAr;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let images = "";
    if (args.images.length > 0) {
      let png_url = "main-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "projects");
      let path_url = uploaddir + "/" + png_url;
      images = "projects/" + png_url;
      fs.access(uploaddir, function (error) {
        //console.log(args.projectMainImages.length);
        fs.writeFile(
          path_url,
          args.images[0],
          { encoding: "base64" },
          (err) => {}
        );
        console.log("Directory exists.");
      });
    }

    let insert = await db.query_new(
      "insert into blog (title,description,categories,title_ar,description_ar,categories_ar,images,created_at,updated_at) values(?,?,?,?,?,?,?,?,?)",
      [
        title,
        description,
        categories,
        title_ar,
        description_ar,
        categories_ar,
        images,
        created_at,
        created_at,
      ]
    );
    return insert;
  };

  static updatePost = async (args) => {
    let title = args.title;
    let description = args.description;
    let categories = args.categories;
    let title_ar = args.titleAr;
    let description_ar = args.descriptionAr;
    let categories_ar = args.categoriesAr;
    let id = args.id;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    let images = "";
    //console.log(args.images);
    if (args.images.length > 0) {
      let png_url = "main-" + new Date().getTime() + ".jpeg";
      let uploaddir = path.join("uploads", "projects");
      let path_url = uploaddir + "/" + png_url;
      images = "projects/" + png_url;
      fs.access(uploaddir, function (error) {
        fs.writeFile(
          path_url,
          args.images[0],
          { encoding: "base64" },
          (err) => {}
        );
        console.log("Directory exists.");
      });
      await db.query_new("update blog set images=? where id=?", [images, id]);
    }

    let update = await db.query_new(
      "update blog set title=?,description=?,categories=?,title_ar=?,description_ar=?,categories_ar=?,updated_at=? where id=?",
      [
        title,
        description,
        categories,
        title_ar,
        description_ar,
        categories_ar,
        created_at,
        id,
      ]
    );
    return update;
  };

  static getPostByPagination = async (args) => {
    const cnt = await db.query_new("select count(id) as cnt from blog");
    const results = await db.query_new(
      "select *from blog order by id desc limit ?,?",
      [(args.currentPage - 1) * args.postsPerPage, args.postsPerPage]
    );

    const obj = {
      totalPage: cnt[0].cnt,
      data: results,
    };
    return obj;
  };

  static getPostById = async (args) => {
    const results = db.query_new("select *from blog where id=? ", [args.id]);
    return results;
  };
  static area = async (args) => {
    const results = db.query_new("select area from projects group by area");
    return results;
  };
  static city = async (args) => {
    const results = db.query_new("select city from projects group by city");
    return results;
  };
  static district = async (args) => {
    const results = db.query_new(
      "select district from projects group by district"
    );
    return results;
  };

  static addVillas = async (args) => {
    //console.log(args);
    //return;
    let datas = args.data;
    let project = args.project;
    console.log(project);
    await db.query_new("delete from villas where project_code=?", [project]);
    // return;
    let created_at = Moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    if (datas.length > 0) {
      datas.map(async (data, i) => {
        await db.query_new(
          "insert into villas (types,price,project_code,beneficiary_name,type_name,iqama,code,block,villa_no,bedroom,completion_per,report_browser,created_at) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            data.type,
            data.price,
            data.project_code,
            data.name,
            data.type_name,
            data.iqama,
            data.code,
            data.block,
            data.villa_no,
            data.bedroom,
            data.per,
            data.report,
            created_at,
          ]
        );
      });
    }

    return 1;
  };
};
