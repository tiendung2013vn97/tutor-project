module.exports = fields => {
  return {
    status:'fail',
    code: "WRONG_TYPE",
    detail: {
      fields
    },
    msg:"One of the input parameters has the wrong type."
  };
};
