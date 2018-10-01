/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    category_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    category_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    source: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    display: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    summary: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_delete: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    view: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    comments: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    markdown: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    smtitle: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'article'
  });
};
