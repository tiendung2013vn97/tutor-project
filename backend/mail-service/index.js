const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail/mail-config");
const jwt = require("jsonwebtoken");
const config = require("../config");

const FROM_EMAIL = mailConfig.FROM_EMAIL;
const EMAIL_SECRET = mailConfig.EMAIL_SECRET;
const TOKEN_LIFETIME = mailConfig.TOKEN_LIFETIME;
const EMAIL_PUBLIC_KEY = mailConfig.EMAIL_PUBLIC_KEY;
const EMAIL_PASSWORD = mailConfig.EMAIL_PASSWORD;

const createEmailToken = (user, emailSecret = EMAIL_SECRET) => {
  return jwt.sign(user, emailSecret, {
    expiresIn: TOKEN_LIFETIME,
    algorithm: "RS256"
  });
};
exports.sendMailConfirm = (user, fromEmail = FROM_EMAIL) => {
  let expired = TOKEN_LIFETIME / 3600;
  let emailToken = createEmailToken(user);
  let confirmUrl =
    config.url + "/public-user/verify-email?emailToken=" + emailToken;

  const msg = {
    to: user.email,
    from: fromEmail,
    subject: "ADDODA: Xác nhận đăng kí tài khoản",
    html: `FROM: ADDODA website <br>
      Nhấn vào link "Xác nhân" bên dưới để kích hoạt tài khoản của bạn<br>
      <a href="${confirmUrl}">Xác nhận</a><br><br>
    
     Nếu link trên không hoạt động, vui lòng sao chép link dưới đây và dán vào tag browse để chạy <br>
      <a href="${confirmUrl}">${confirmUrl}</a><br><br>
      Link đăng kí sẽ hết hạn sau ${expired} giờ.`
  };
  // create reusable transporter object using the default SMTP transport
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: FROM_EMAIL,
        pass: EMAIL_PASSWORD
      }
    });

    transporter.sendMail(msg, (err, info) => {
      if (err) {
        return reject(error.MAILER(err));
      } else {
        return resolve(info);
      }
    });
  });
};

exports.sendMailConfirmChangePassword = (user, fromEmail = FROM_EMAIL) => {
  let expired = TOKEN_LIFETIME / 3600;
  let emailToken = createEmailToken(user);
  let confirmUrl =
    config.url +
    "/public-user/verify-changed-password?emailToken=" +
    emailToken;

  const msg = {
    to: user.email,
    from: fromEmail,
    subject: "ADDODA: Thay đổi mật khẩu",
    html: `FROM: ADDODA website <br>
      Bạn vừa yêu cầu thay đổi password, vui lòng nhấn vào link bên dưới để xác nhận
      <a href="${confirmUrl}">Xác nhận</a><br><br>
    
      Nếu link trên không hoạt động, vui lòng sao chép link dưới đây và dán vào tag browse để chạy <br>
      <a href="${confirmUrl}">${confirmUrl}</a><br><br>
      Link xác nhận này sẽ hết hạn sau ${expired} giờ.`
  };

  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: FROM_EMAIL,
        pass: EMAIL_PASSWORD
      }
    });

    transporter.sendMail(msg, (err, info) => {
      if (err) {
        return reject(error.MAILER(err));
      } else {
        return resolve(info);
      }
    });
  });
};

exports.verifyEmailToken = emailToken => {
  return new Promise((resolve, reject) => {
    jwt.verify(emailToken, EMAIL_PUBLIC_KEY, (err, user) => {
      if (err) {
        console.log("error when verifying email token: ", err);
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};
