const time = {
  /**
   * @return yy-mm-dd
   */
  ymd () {
    const nowDate = new Date()
    let month = nowDate.getMonth() + 1
    let date = nowDate.getDate()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    return `${nowDate.getFullYear()}-${month}-${date}`
  }
}

module.exports = time
