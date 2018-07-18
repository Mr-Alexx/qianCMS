// 引入数据库连接插件
const Sequelize = require('sequelize')

const config = {
  host: 'localhost',
  user: 'root',
  pwd: 'Qian3160366',
  database: 'blog',
  port: 3306
}

// 连接数据库
module.exports =  new Sequelize(config.database, config.user, config.pwd, {
  host: config.host,
  dialect: 'mysql',
  define: {
    // 该参数将用于所有定义模型的默认参数
    timestamps: false, // 取消Sequelize自动给数据表添加的createAt和updateAt两个时间戳
    freezeTableName: true // 这个选项表示，数据库中的表明与程序中的保持一致，否则数据库中的表名会以复数的形式命名
  }
})