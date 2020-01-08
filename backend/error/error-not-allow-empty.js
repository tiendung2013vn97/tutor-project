module.exports = fields => {
  return {
    status:'fail',
    code: "NOT_ALLOW_EMPTY",
    detail: fields,
    msg:"The parameter is required to be not empty but still empty."
  };
};
