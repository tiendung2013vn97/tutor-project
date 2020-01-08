module.exports = fields => {
  return {
    status:'fail',
    code: "DATA_DUPLICATED",
    detail: {
      fields
    },
    msg:"records already exists in the database."
  };
};
