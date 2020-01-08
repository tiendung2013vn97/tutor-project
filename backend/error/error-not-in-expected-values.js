module.exports = arr => {
  return {
    status:'fail',
    code: "INVALID_FIELD",
    detail: arr,
    msg: "One of the input parameters isn't in exptected values."
  };
};
