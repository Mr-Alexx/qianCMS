const valiSql = (str) => {
  const re = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/ig
  return str.match(re)
}

export {
  valiSql
}
