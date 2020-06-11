// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const airports = sequelizeClient.define('airports', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lon: {
      type: DataTypes.FLOAT(11),
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT(11),
      allowNull: false
    },
      
      
      
  }, {
    charset: 'utf8',
    collate: 'utf8_bin', // this is to allow for 4-byte utf-8 chars
    timestamps: false,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  airports.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return airports;
};
