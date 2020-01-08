module.exports = fields => {
  return {
    status:'fail',
    code: "NOT_EXISTS",
    msg:`${fields} does not exist.`
  };
};
