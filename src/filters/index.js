// 时间格式化 yy-mm-dd hh:mm
export const timeFilter = (time) => {
  const date = new Date(time)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const strDate = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${date.getFullYear()}-${month}-${strDate} ${hour}:${minute}`
}
