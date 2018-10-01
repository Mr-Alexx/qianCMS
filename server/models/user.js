/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    uname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    real_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: ''
    },
    pwd: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    enable: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    remark: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_item: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'user'
  });
};
