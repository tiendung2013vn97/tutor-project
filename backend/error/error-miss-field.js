module.exports = fields => {
  return {
    status:'fail',
    code: "MISSING_FIELD",
    detail: fields,
    msg:"One of the required input parameters is missed."
  };
};
