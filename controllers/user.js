const userModel = require("../models/userModel");
const email = require("./mail");

module.exports = class projectControllers {
  static login = async (req, res, next) => {
    try {
      if (req.body.email && req.body.password) {
        let data = req.body;
        const email = data.email;
        const password = data.password;

        const [email_check] = await userModel.checkEmailPass(email, password);

        if (email_check) {
          const obj = {
            message: "Successfully logged in ",
            results: email_check,
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "Username or password entered wrong!",
            result: [],
            status: false,
          };
          //console.log(obj);
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };

  static subscribe = async (req, res, next) => {
    // console.log(req.body);
    try {
      if (req.body.email) {
        const checkexist = await userModel.checkSubscribe(req.body.email);

        if (checkexist.length == 0) {
          const results = await userModel.subscribeInsert(req.body);
          const obj = {
            message: "Subscribe successfully",
            results: "added",
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "Email already register",
            results: "added",
            status: false,
          };
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };

  static checkEmail = async (req, res, next) => {
    try {
      if (req.body.email) {
        const results = await userModel.checkEmail(req.body);
        if (results.length) {
          const obj = {
            message: "Data fetch successfully",
            results: results,
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "No data",
            results: [],
            status: false,
          };
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };
  static checkWhatsaap = async (req, res, next) => {
    try {
      if (req.body.whatsapp) {
        const results = await userModel.checkWhatsaap(req.body);
        if (results.length) {
          const obj = {
            message: "Data fetch successfully",
            results: results,
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "No data",
            results: [],
            status: false,
          };
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };
  static checkPhone = async (req, res, next) => {
    try {
      if (req.body.phone) {
        const results = await userModel.checkPhone(req.body);
        if (results.length) {
          const obj = {
            message: "Data fetch successfully",
            results: results,
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "No data",
            results: [],
            status: false,
          };
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };

  static registration = async (req, res, next) => {
    try {
      // console.log(req.body);
      if (
        req.body.pharmacy_name &&
        req.body.pharmacy_owner_name &&
        req.body.whatsapp &&
        req.body.tax_no &&
        req.body.pharmacy_type &&
        req.body.email &&
        req.body.phone &&
        req.body.password
      ) {
        // console.log("d");
        const result = await userModel.addUser(req.body);
        if (result.insertId) {
          const [email_check] = await userModel.checkEmailPass(
            req.body.email,
            req.body.password
          );

          const obj = {
            message: "Data deleted successfully",
            results: email_check,
            status: true,
          };
          res.status(200).json(obj);
        } else {
          next();
        }
      } else {
        console.log(req.body);
        next();
      }
    } catch (err) {
      // console.log(err);
      err.statusCode = 500;
      next();
    }
  };

  static addcontact = async (req, res, next) => {
    try {
      if (
        req.body.name &&
        req.body.email &&
        req.body.phone &&
        req.body.message
      ) {
        const results = await userModel.insertContact(req.body);

        if (results) {
          const obj = {
            message: "Successfully Added ",
            results: "added",
            status: true,
          };

          const message = `<style type="text/css">
          p{ font-size: 12px;
              font-family: verdana;}
      
          .titledesc {
              font-size: 12px;
              font-family: verdana;
          }
          .subtotalrow {
              font-weight: 700;
          }
          .btn
          {
              font-family: Verdana;
              font-size: 16px;
              background: Green;
              color:white;
              padding: 15px 32px;
              text-align: center;
              display: inline-block;
              margin:4px 2px;
      
          }
          .table-style
          {
              font-family: Tahoma;
              font-size: 12px;
              color:#000;
              text-align: center;
              border-collapse: collapse;
              border: 1px solid #A2765B;
              width: 50%;
      
          }
          .table-style-custom
          {
              font-family: Tahoma;
              font-size: 12px;
              color:white;
              text-align: center;
              border-collapse: collapse;
              border: 1px solid #605E5E;
              background: #605E5E;
              width: 100%;
      
          }
          #box-table-title {
              font-family: Tahoma;
              font-size: 12px;
              color:#000;
              background-color:#DCDCDC;
              text-align: center;
              border-collapse: collapse;
              border: 1px solid #A2765B;
              width: 100%;
          }
          #box-table-details {
              font-family: Tahoma;
              font-size: 12px;
              color:#A2765B;
              text-align: center;
              border-collapse: collapse;
              border: 1px solid #A2765B;
              width: 100%;
          }
      
          #box-table-details th {
              font-size: 12px;
              font-weight: normal;
              text-align: center;
              background: #A2765B;
              font-weight: bold;
              color:white;
          }
      
          #box-table-details td {
      
              color: black ;
          }
          #box-table-summary {
              font-family: Tahoma;
              color:#000;
              font-size: 12px;
              text-align: center;
              border-collapse: collapse;
              border: 1px solid #E3EAEB;
              width: 100%;
      
          }
          #box-table-summary th {
              font-size: 12px;
              font-weight: normal;
              background: #E3EAEB;
              width: 10%;
              text-align:center;
              font-weight: bold;
              color:Black;
              font-family: Tahoma;
          }
      
          #box-table-summary td {
      
              border-bottom: 1px solid #E3EAEB;
              color: black;
              font-family: Tahoma;
          }
      </style>
      
      <p>
        Someone contact you from Artar website
      </p>
      <table WIDTH="90%"  id="box-table-summary" border="1"  cellpadding="1" cellspacing="1">
          <tr>
              <td style="color:#fff;background-color:#A2765B;font-weight: bold;">Name</td>
              <td style="color:#fff;background-color:#A2765B;font-weight: bold;">Email</td>
              <td style="color:#fff;background-color:#A2765B;font-weight: bold;">Phone</td>
              <td style="color:#fff;background-color:#A2765B;font-weight: bold;">Message</td>
          </tr>
          <tr>
              <td style="color:#000;background-color:#fff;font-weight: bold;">${req.body.name}</td>
              <td style="color:#000;background-color:#fff;font-weight: bold;">${req.body.email}</td>
              <td style="color:#000;background-color:#fff;font-weight: bold;">${req.body.phone}</td>
              <td style="color:#000;background-color:#fff;font-weight: bold;">${req.body.message}</td>
          </tr>         
      </table>
      
      
      
      <br><br>
      <span style="font-size: 11px;font-family: verdana;text-align: left;color: #565454; font-style: italic;">
                              This is system Auto generated email. Please do not reply.For more information call IT Department.
                          </span>
      `;
          const subject = "New Contact";

          email.sendmail(message, subject);
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "Please try again",
            result: [],
            status: false,
          };
          //console.log(obj);
          res.status(200).json(obj);
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      next();
    }
  };
  static changePassword = async (req, res, next) => {
    try {
      // console.log(req.body);
      if (req.body.oldpassword && req.body.password && req.body.userId) {
        // console.log("d");
        const checkPassword = await userModel.checkPassword(req.body);
        if (checkPassword.length) {
          const results = await userModel.changePassword(req.body);
          const obj = {
            message: "Password change successfully",
            status: true,
          };
          res.status(200).json(obj);
        } else {
          const obj = {
            message: "Enter password not match",
            status: false,
          };
          res.status(200).json(obj);
        }
      } else {
        console.log(req.body);
        next();
      }
    } catch (err) {
      // console.log(err);
      err.statusCode = 500;
      next();
    }
  };
};
