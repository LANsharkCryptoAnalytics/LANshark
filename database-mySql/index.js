const Sequelize = require('sequelize');
// const dbHelpers = require('./dbHelpers.js');
// const user = require('./models/user.js')
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}/ARHISTORY`);

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
    unique: true

  },
  favorites: Sequelize.STRING //needs to be an array of strings really
  //foreign keys etc.
});

// force: true will drop the table if it already exists
User.sync({
    force: true
  }).then(() => {
    // Table created
    //sample user made here
    return User.create({
      firstName: 'John',
      lastName: 'Hancock',
      email: 'me@me.com',
      favorites: '123123'
    });
  }).then(() => {
    // Table created
    //sample user made here
    return User.create({
      firstName: 'Bruce',
      lastName: 'Lee',
      email: 'blee@kungfu.com',
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

  const NeighborHood = sequelize.define('neighborHood', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    //  unique: true
    },
    lat: {
      type: Sequelize.STRING//may need to be int
    },
    long: {
      type: Sequelize.STRING//may need to be int
    },
    fullPage: {
      type: Sequelize.STRING,
    },
    pois: {
      type: Sequelize.STRING
    }
    
  });
  const Poi = sequelize.define('poi', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.STRING//may need to be int
    },
    long: {
      type: Sequelize.STRING//may need to be int
    },
    fullPage: {
      type: Sequelize.STRING,
      // unique: true
    },
  });

module.exports = {
  sequelize,
  User, 
  Poi
};