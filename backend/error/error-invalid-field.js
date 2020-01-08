module.exports = fields => {
  return {
    status:'fail',
    code: "INVALID_FIELD",
    detail: {
      fields
    }
  };
};
