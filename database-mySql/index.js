const Sequelize = require('sequelize');

// The below is required in this file only to enable the testing of the 
// addFavorite function at the bottom
const helpers = require('../helpers.js');

require('dotenv').config();

const sequelize = new Sequelize(`mysql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}/ARHISTORY`);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// ///////////////////////////////////////////////////////////////////////////////
//  Models -- to be exported to their own pages soon for modularness           //
//     "separation of concerns"   (Said in an imitation Godfather voice)       //                                               //
// //////////////////////////////////////////////////////////////////////////////


const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Favorite = sequelize.define('favorite', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  long: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  latLong: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  wide: {
    type: Sequelize.STRING,
  },
  narrow: {
    type: Sequelize.STRING,
  },
  wideWiki: {
    type: Sequelize.STRING,
  },
  narrowWiki: {
    type: Sequelize.STRING,
  },
  wikiImage: {
    type: Sequelize.STRING,
  },
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,

  },
});

// force: true will drop the table if it already exists
User.sync({
  force: false,
})
  .then(() => {
    console.log('User synced');
  })
  .catch((error) => {
    throw error;
  });
// .then(() => User.create({
//   username: 'John',
//   password: '12345',
//   email: 'me@me.com',
// }));
// .then(() => {
// add a user for testing
//   User.findOrCreate({ where: { username: 'Josef', email: 'email@email.com' } })
//     .spread((user, created) => {
//     // console.log(user.get({
//     //   plain: true,
//     // }));
//     // console.log(created);
//     });
// })
// .then(() => {
//   // add the same user again to test function - should return false
//   User.findOrCreate({ where: { username: 'Josef', email: 'email@email.com' } })
//     .spread((user, created) => {
//       // console.log(user.get({
//       //   plain: true,
//       // }));
//       // console.log(created);
//     });
// })
// .catch();

const Vcs = sequelize.define('vcs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  lotNumber: {
    type: Sequelize.INTEGER,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  lat: {
    type: Sequelize.STRING, // may need to be int
  },
  long: {
    type: Sequelize.STRING, // may need to be int
  },
  address: {
    type: Sequelize.STRING,
  },
  infoText: {
    type: Sequelize.STRING,
  },
  ownerShip: {
    type: Sequelize.STRING,
  },
});

Favorite.sync({
  force: false, // true drops database
}).then(() => {
  // Asscoiate the users id as a foreign key with the favorite
  Favorite.belongsTo(User, { foreignKey: 'id' });
})
  .catch((error) => {
    throw (error);
  });
// .then(() => Favorite.create({
//   name: 'French Market',
//   lat: 30,
//   long: 90,
//   latLong: '3090',
//   wide: 'some stuff goes here!!!',
//   narrow: 'Other stuff goes here',
//   foreignKey: 2,
//   wideWiki: 'www.stuff.com',
//   narrowWiki: 'otherstuff.com',
//   wikiImage: 'sdfkjhsdkjfhksjdfhkjshdf',
// }))
// // THIS IS HERE TO TEST THE ADD TO FAVORITES FUNCTION. CURRENTLY NO USER INFO BEING
// // PASSED FROM THE CLIENT. I HARD CODED A FAVORITE AND A USER FOR THIS PURPOSE
//   .then(() => {
//     const testFavorite = {
//       name: 'a place you want to save',
//       latitude: 29.9773846936982,
//       longitude: -90.07604716542896,
//       latLong: '29.9773846936982-90.07604716542896',
//       wideData: ['Fairgrounds'],
//       narrowData: ['Rivoli Theatre', 'movie theater'],
//       wideWiki: 'www.cantgetenough.com',
//       narrowWiki: 'www.ofthatfunkystuff.com',
//       wikiImage: 'sdfkjhsdkjfhksjdfhkjshdf',
//     };
//     const testFavorite2 = {
//       name: 'the zoo',
//       latitude: 29.9773846936982,
//       longitude: -90.07604716542896,
//       latLong: '29.9773846936982-90.07604716542896',
//       wideData: ['snake and tigers'],
//       narrowData: ['tortoises'],
//       wideWiki: 'www.zoo.com',
//       narrowWiki: 'www.zoo2.com',
//       wikiImage: 'stuff ',
//     };
//     // const testUser = {
//     //   username: 'Satan',
//     //   email: '666@hell.com',
//     //   id: 13,
//     // };
//     const testUser2 = {
//       username: 'John',
//       email: 'me@me.com',
//       id: 2,
//     };
//     // Test addToFavorites
//     // console.log('test add to favorites');
//     // helpers.addToFavorites(testFavorite, testUser2);
//     helpers.addToFavorites(testFavorite2, testUser2);
//   });

module.exports = {
  sequelize,
  User,
  Favorite,
  Vcs,
};
