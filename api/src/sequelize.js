const Sequelize = require('sequelize');

module.exports = function (app) {
  // const connectionString = app.get('mysql');
  // const sequelize = new Sequelize(connectionString, {
  //   dialect: 'mysql',
  //   logging: false,
  //   define: {
  //     freezeTableName: true
  //   }
  // });

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database

    // use alter: true here to drop table and force sync
    app.set('sequelizeSync', sequelize.sync({force: false }));

    return result;
  };
};
