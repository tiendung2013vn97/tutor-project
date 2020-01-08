module.exports = (funcName,err) => {
  return {
    status:'fail',
    code: "ERROR_FUNCTION",
    detail: funcName,
    msg:`Error when running function ${funcName}.
        ${err+""} `
  };
};
