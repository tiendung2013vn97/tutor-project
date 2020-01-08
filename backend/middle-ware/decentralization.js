module.exports = (req, res, next) => {
    let login = [
        [/^study-request\/?$/, "GET"],
        [/^contract\/?$/, "GET"],
        [/^contract\/by-id\/[0-9]+$/, "GET"],
        [/^login-user\/image\/?$/, "GET"],
        [/^login-user\/upload-image\/?$/, "POST"],
        [/^login-user\/?$/, "PUT"],
        [/^login-user\/password\/?$/, "PUT"]
    ];
    let adminOrRoot = [
        [/^study-request\/?$/, "GET"],
        [/^contract\/by-status\/[a-zA-Z0-9]+$/, "GET"],
        [/^contract\/[0-9]+$/, "DELETE"],
        [/^skill-tag\/[0-9]+$/, "PUT"],
        [/^skill-tag\/?$/, "POST"],
        [/^skill-tag\/[0-9]+$/, "DELETE"],
        [/^skill-tag\/active\/[0-9]+$/, "PUT"],
        [/^admin\/active\/[a-zA-Z0-9]+$/, "PUT"],
        [/^admin\/[a-zA-Z0-9]+$/, "DELETE"],
        [/^admin\/users+\/?$/, "GET"]
    ];
    let root = [];

    let student = [
        [/^study-request\/[0-9]+$/, "POST"],
        [/^study-request\/student-confirm\/[0-9]+$/, "PUT"],
        [/^study-request\/reject\/[0-9]+$/, "PUT"],
        [/^contract\/student-complain\/[0-9]+$/, "PUT"],
        [/^contract\/resolve-complain\/[0-9]+$/, "PUT"],
        [/^contract\/finish\/[0-9]+$/, "PUT"],
        [/^contract\/cancle\/[0-9]+$/, "PUT"]
    ];

    let teacher = [
        [/^study-request\/teacher-confirm\/[0-9]+$/, "PUT"],
        [/^study-request\/teacher-update\/[0-9]+$/, "PUT"],
        [/^skill\/?$/, "POST"],
        [/^skill\/[0-9]+$/, "PUT"],
        [/^skill\/[0-9]+$/, "DELETE"],
        [/^skill\/me\/?$/, "GET"]
    ];

    let allow = true;
    login.forEach(regex => {
        if (
            RegExp(regex[0]).test(req.originalUrl) &&
            req.method === regex[1] &&
            (!req.user ||
                !["student", "teacher", "admin", "root"].includes(req.user.type))
        ) {
            return (allow = false);
        }
    });
    if (!allow) {
        return res.json({
            status: "fail",
            code: "NOT_ALLOW",
            msg: "Bạn không có quyền thực hiện thao tác này"
        });
    }

    adminOrRoot.forEach(regex => {
        if (
            RegExp(regex[0]).test(req.originalUrl) &&
            req.method === regex[1] &&
            (!req.user || !["admin", "root"].includes(req.user.type))
        ) {
            return (allow = false);
        }
    });
    if (!allow) {
        return res.json({
            status: "fail",
            code: "NOT_ALLOW"
        });
    }

    student.forEach(regex => {
        if (
            RegExp(regex[0]).test(req.originalUrl) &&
            req.method === regex[1] &&
            (!req.user || !["student"].includes(req.user.type))
        ) {
            return (allow = false);
        }
    });
    if (!allow) {
        return res.json({
            status: "fail",
            code: "NOT_ALLOW"
        });
    }

    teacher.forEach(regex => {
      console.log(regex[0], req.originalUrl, RegExp(regex[0]).test(req.originalUrl))
        if (
            RegExp(regex[0], 'g').test(req.originalUrl) &&
            req.method === regex[1] &&
            (!req.user || !["teacher"].includes(req.user.type))
        ) {
          console.log(req.originalUrl)
            return (allow = false);
        }
    });
    if (!allow) {
        console.log("asdas")
        return res.json({
            status: "fail",
            code: "NOT_ALLOW"
        });
    }

    next();
};
