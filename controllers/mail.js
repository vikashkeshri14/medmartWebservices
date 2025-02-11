const nodemailer = require("nodemailer");
// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: "",
    pass: "",
  },
});
module.exports = class mailControllers {
  static sendmail = async (message, subject) => {
    //console.log(args);
    try {
      //return;
      const mailOptions = {
        from: "it.not@artar.com.sa",
        to: "v.keshri@artar.com.sa",
        subject: subject,
        html: message,
      };

      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return 0;
        } else {
          return 1;
        }
      });

      // console.log(args);
    } catch (err) {
      // console.log(err);
    }
  };
};
