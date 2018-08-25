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
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// ///////////////////////////////////////////////////////////////////////////////
//  Models -- to be exported to their own pages soon for modularness           //
//                     "separation of concerns"   (Said in an imitation Godfather voice)                                                      //
// ///////////////////////////////////////////////////////////////////////////////


const User = sequelize.define('user', {

  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
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
    type: Sequelize.STRING, // may need to be int
  },
  long: {
    type: Sequelize.STRING, // may need to be int
  },
  wikiDataLink: {
    type: Sequelize.STRING,
  },
  wikipediaLink: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.STRING, // TODO: make this an array, 
  },
  type: {
    type: Sequelize.STRING,
  },
  images: {
    type: Sequelize.STRING,
  },
  wide: {
    type: Sequelize.STRING,
  },
  narrow: {
    type: Sequelize.STRING,
  },
  foreignKey: {
    type: Sequelize.INTEGER,
  },
});

// force: true will drop the table if it already exists
User.sync({
  force: true,
}).then(() => User.create({
  username: 'John',
  password: '12345',
  email: 'me@me.com',
  // favorites: '123123',
})).then(() => {
  User.findAll().then((users) => {
    console.log('find all');
    users.forEach((user) => {
      console.log(user.dataValues);
    });
    // console.log('findAll', users[0].dataValues);
  });
}).then(() => {
  // add a user for testing
  User.findOrCreate({ where: { username: 'Josef', email: 'email@email.com' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true,
      }));
      console.log(created);
    });
})
  .then(() => {
    // add the same user again to test function - should return false
    User.findOrCreate({ where: { userName: 'Josef', email: 'email@email.com' } })
      .spread((user, created) => {
        console.log(user.get({
          plain: true,
        }));
        console.log(created);
      });
  });

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
  force: true, // true drops database
}).then(() => {
  // User.hasMany(Favorite, { foreignKey: 'id' });
  Favorite.belongsTo(User, { foreignKey: 'id' });
}).then(() => Favorite.create({
  // name: 'French Market',
  lat: 30,
  long: 90,
  wide: 'some stuff goes here!!!',
  narrow: 'Other stuff goes here',
  foreignKey: 2,
}));


// User.belongsToMany(Favorite, {
//   through: 'UserFavorites',
// });

// Favorite.belongsTo(User, { foreignKey: 'useremail', targetKey: 'email' });

// Adds fk_companyname to User

module.exports = {
  sequelize,
  User,
  Favorite,
  Vcs,
  // Neighborhood,
};



// TODO: Not currently in use
// const Neighborhood = sequelize.define('neighborHood', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     unique: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     unique: true,
//   },
//   lat: {
//     type: Sequelize.STRING, // may need to be int
//   },
//   long: {
//     type: Sequelize.STRING, // may need to be int
//   },
//   fullPage: {
//     type: Sequelize.STRING,
//   },
//   pois: {
//     type: Sequelize.STRING,
//   },

// });

// TODO: not in use yet, or maybe ever
// Neighborhood.sync({
//   force: true, // true drops database
// }).then(() => Neighborhood.create({
//   name: 'French Quarter',
//   lat: 31,
//   long: 91,
//   fullPage: 'wertwuyiweurytwertweyrtiyweritwierutyiuwert',
//   pois: '00000000',
// })).then(() => Neighborhood.findOrCreate({
//   where: {
//     name: 'Lake View',
//     long: 90,
//     lat: 22,
//     fullPage: 'oioioiowieoiwoet',
//     pois: 'wewewewe',
//   },
// }))
//   .then(() => {
//     Neighborhood.findAll().then((neighborhoods) => {
//       console.log('find all');
//       neighborhoods.forEach((neighborhood) => {
//         console.log(neighborhood.dataValues);
//       });
//       // console.log('findAll', users[0].dataValues);
//     });
//   });

