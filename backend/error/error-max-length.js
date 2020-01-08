module.exports = fields => {
  return {
    status:'fail',
    code: "MAX_LENGTH",
    detail: fields,
    msg:"One of the required input parameters is longer than max length."
  };
};
