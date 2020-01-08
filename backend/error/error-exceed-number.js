module.exports = (limit) => {
  return {
    status:'fail',
    code: "EXCEED_NUMBER_ID",
    msg: `The number of processing ids at a time must not exceed ${limit}`
  };
};
