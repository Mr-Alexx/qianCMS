const _ = require('lodash/core')

const validate = {
  /**
   * str must be string, and not empty
  */
  isNullStr (str) {
    return _.isString(str) && (str !== '')
  }
}

module.exports = validate