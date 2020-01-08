const INVALID_FIELD = require("./error-invalid-field");
const MISS_FIELD = require("./error-miss-field");
const EXCEED_NUMBER = require("./error-exceed-number");
const WRONG_TYPE = require("./error_wrong_type");
const WRONG_REGEX = require("./error_wrong_regex");
const UPDATE_DATA_FAILED = require("./error-db-update-failed");
const NOT_IN_EXPECTED_VALUES = require("./error-not-in-expected-values");
const MAX_LENGTH = require("./error-max-length");
const DATA_DUPLICATED = require("./error_data_duplicated");
const NOT_ALLOW_EMPTY = require("./error-not-allow-empty");
const ERROR_FUNCTION = require("./error-function");
const NOT_EXISTS = require("./error-value-not-exist");

module.exports = {
  INVALID_FIELD,
  MISS_FIELD,
  EXCEED_NUMBER,
  WRONG_TYPE,
  WRONG_REGEX,
  UPDATE_DATA_FAILED,
  NOT_IN_EXPECTED_VALUES,
  MAX_LENGTH,
  DATA_DUPLICATED,
  NOT_ALLOW_EMPTY,
  ERROR_FUNCTION,
  NOT_EXISTS
};
