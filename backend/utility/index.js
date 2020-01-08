const joi = require("joi");
const error = require("../error");

const Utility = {
  countNumberOfId(...args) {
    let count = 0;
    args.forEach(param => {
      if (param) {
        count += param.val.split(",").length;
      }
    });
    return count;
  },

  checkType(args) {
    let invalidFields = [];
    Object.keys(args).forEach(param => {
      let schema;
      switch (args[param].dataType) {
        case "string": {
          schema = joi.string().allow("");
          break;
        }
        case "int": {
          schema = joi.number().integer();
          break;
        }
        default: {
          schema = joi.string();
          break;
        }
      }

      if (joi.validate(args[param].val, schema).error) {
        invalidFields.push(param);
      }
    });

    return invalidFields;
  },

  validateMaxLength(args) {
    let invalidFields = [];
    Object.keys(args).forEach(param => {
      if (args[param].maxLength) {
        let schema = joi.string().max(args[param].maxLength);
        if (joi.validate(args[param].val, schema).error) {
          invalidFields.push({
            fieldName: param,
            maxLength: args[param].maxLength
          });
        }
      }
    });

    if (invalidFields.length) {
      throw error.MAX_LENGTH(invalidFields);
    }
  },

  checkRegex(args) {
    let invalidFields = [];
    Object.keys(args).forEach(param => {
      if (args[param].regex) {
        let schema = joi.string().regex(args[param].regex);
        if (joi.validate(args[param].val, schema).error) {
          invalidFields.push(param);
        }
      }
    });

    return invalidFields;
  },

  validateTypeAndRegex(args) {
    let invalidFields = Utility.checkType(args);
    if (invalidFields.length) {
      throw error.WRONG_TYPE(invalidFields);
    }

    invalidFields = Utility.checkRegex(args);
    if (invalidFields.length) {
      throw error.WRONG_REGEX(invalidFields);
    }
  },

  validateNumberOfId(limit, ...args) {
    if (Utility.countNumberOfId(...args) > limit) {
      throw error.EXCEED_NUMBER(limit);
    }
  },

  validateRequireParam(args) {
    let missFields = Object.entries(args)
      .filter(item => item[1].require && item[1].val === undefined)
      .map(item => item[0]);

    if (missFields.length) {
      throw error.MISS_FIELD(missFields);
    }
  },

  removeUnnecessaryParam(args) {
    Object.keys(args)
      .filter(key => args[key].val === undefined)
      .forEach(key => delete args[key]);
    return args;
  },

  keepOnlyParams(input, params) {
    let result = Object.assign({}, input);
    Object.keys(result).forEach(key => {
      if (!params.includes(key)) {
        delete result[key];
      }
    });

    return result;
  },

  minifySameElement(arr) {
    return arr.filter((item, index) => {
      return arr.indexOf(item) === index;
    });
  },

  convertToValueObject(args) {
    let valObject = {};
    Object.entries(args).forEach(item => {
      valObject[item[0]] = item[1].val;
    });
    return valObject;
  },

  validateExpectedValues(args) {
    let invalidFields = [];
    Object.keys(args).forEach(param => {
      if (
        args[param].expected &&
        !args[param].expected.includes(args[param].val)
      ) {
        invalidFields.push({
          fieldName: param,
          expected: args[param].expected
        });
      }
    });

    if (invalidFields.length) {
      throw error.NOT_IN_EXPECTED_VALUES(invalidFields);
    }
  },

  validateEmpty(args) {
    let invalidFields = [];
    Object.keys(args).forEach(param => {
      if (args[param].val === "" && args[param].allowEmpty === false) {
        invalidFields.push(param);
      }
    });

    if (invalidFields.length) {
      throw error.NOT_ALLOW_EMPTY(invalidFields);
    }
  }
};

module.exports = Utility;
