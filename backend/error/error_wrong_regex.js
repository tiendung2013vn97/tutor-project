module.exports = fields => {
  return {
    status:'fail',
    code: "WRONG_REGEX",
    detail: {
      fields
    },
    msg:"One of the input parameters has the wrong required format."
  };
};
