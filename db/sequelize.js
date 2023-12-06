const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test_db', 'root', 'password', {
  host: 'mysql-service',
  dialect: 'mysql',
});

try {
  await sequelize.authenticate();
  console.log("Connection with MySQL has been extablished.");
} catch (error) {
  console.error("Cannot connect with MySQL");
  console.error(error);
}

module.exports = sequelize;
