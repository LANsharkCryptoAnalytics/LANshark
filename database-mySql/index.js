const dbConfig = require('./config.js');
const Sequelize = require('sequelize');
// const dbHelpers = require('./dbHelpers.js');
// const user = require('./models/user.js')

const sequelize = new Sequelize(`mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/ARHISTORY`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  //   unique: true
  // },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    // unique: true

  },
  favorites: Sequelize.STRING //needs to be an array of strings really
  //foreign keys etc.
});

// force: true will drop the table if it already exists
User.sync({
    force: true
  }).then(() => {
    // Table created

    return User.create({
      firstName: 'John',
      lastName: 'Hancock',
      email: 'me@me.com',
      favorites: '123123'
    });
  })
  .then(() => {
    User.findAll().then((users) => {
      console.log('find all');
      users.forEach((user) => {
        console.log(user.dataValues);
      })
      // console.log('findAll', users[0].dataValues);
    });
  });

module.exports = {
  sequelize,
  User
  //poi goes here 
};