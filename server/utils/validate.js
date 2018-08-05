const _ = require('lodash/core')

const validate = {
  /**
   * str must be string, and not empty
  */
  isNullStr (str) {
    return _.isString(str) && (str === '')
  },
  validateForm (form) {
    console.log(form)
    if (!_.isNumber(form.category_id)) {
      return '分类名称id必须是整型'
    }
    if (!_.isBoolean(form.display)) {
      return '显示类型必须是布尔型'
    }

    if (validate.isNullStr(form.title) || form.title.length > 30) {
      return '标题不能为空且不能超过30个字符'
    }

    if (validate.isNullStr(form.smtitle) || form.smtitle.length > 30) {
      return '小标题不能为空且不能超过30个字符'
    }

    if (validate.isNullStr(form.source) || form.source.length > 10) {
      return '来源不能为空且不能超过10个字符'
    }

    if (validate.isNullStr(form.summary) || form.summary.length > 255) {
      return '文章摘要不能为空且不能超过255个字符'
    }

    if (validate.isNullStr(form.tags)) {
      return '标签至少要选择一个'
    }

    if (validate.isNullStr(form.html) || form.html.length > 30000) {
      return 'markdown页面不能为空且不能超过30000个字符'
    }
    if (validate.isNullStr(form.markdown) || form.markdown.length > 30000) {
      return 'markdown内容不能为空且不能超过30000个字符'
    }
    return false
  },
  // 防止sql注入验证
  valiSql (str) {
    const re = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/ig
    return str.match(re)
  }
}

module.exports = validate
