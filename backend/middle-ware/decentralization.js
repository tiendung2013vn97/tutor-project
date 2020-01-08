module.exports = (req, res, next) => {
  let login = [
    [/study-request\/?/, "GET"],
    [/contract\/?/, "GET"],
    [/contract\/by-id\/[0-9]+/, "GET"]
  ];
  let adminOrRoot = [
    ["study-request", "GET"],
    [/contract\/by-status\/[a-zA-Z0-9]+/, "GET"],
    [/contract\/[0-9]+/, "DELETE"],
    [/skill-tag\/[0-9]+/, "PUT"],
    [/skill-tag\/?/, "POST"],
    [/skill-tag\/[0-9]+/, "DELETE"]
  ];
  let root = [];

  let student = [
    [/study-request\/[0-9]+/, "POST"],
    [/study-request\/student-confirm\/[0-9]+/, "PUT"],
    [/study-request\/reject\/[0-9]+/, "PUT"],
    [/contract\/student-complain\/[0-9]+/, "PUT"],
    [/contract\/resolve-complain\/[0-9]+/, "PUT"],
    [/contract\/finish\/[0-9]+/, "PUT"],
    [/contract\/cancle\/[0-9]+/, "PUT"]
  ];

  let teacher = [
    [/study-request\/teacher-confirm\/[0-9]+/, "PUT"],
    [/study-request\/teacher-update\/[0-9]+/, "PUT"],
    [/skill\/?/, "POST"],
    [/skill\/[0-9]+/, "PUT"],
    [/skill\/[0-9]+/, "DELETE"]
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
      code: "NOT_ALLOW"
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
    if (
      RegExp(regex[0]).test(req.originalUrl) &&
      req.method === regex[1] &&
      (!req.user || !["teacher"].includes(req.user.type))
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

  next();
};
