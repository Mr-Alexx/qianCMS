module.exports = (modulePath) => {
  const module = require.cache[modulePath]
  // remove reference in module.parent
  if (module.parent) {
    // 释放老模块的资源
    module.parent.children.splice(module.parent.children.indexOf(module), 1)
  }
  // 缓存置空
  require.cache[modulePath] = null
}