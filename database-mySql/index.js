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
//                    "separation of concerns"                                                         //
// ///////////////////////////////////////////////////////////////////////////////


const User = sequelize.define('user', {

  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  favorites: Sequelize.STRING, // needs to be an array of strings really
  // foreign keys etc.
});

const Neighborhood = sequelize.define('neighborHood', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  lat: {
    type: Sequelize.STRING, // may need to be int
  },
  long: {
    type: Sequelize.STRING, // may need to be int
  },
  fullPage: {
    type: Sequelize.STRING,
  },
  pois: {
    type: Sequelize.STRING,
  },

});
const Poi = sequelize.define('poi', {
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
  address: {
    type: Sequelize.STRING,
  },
  fullPage: {
    type: Sequelize.STRING,
  },
});


// force: true will drop the table if it already exists
User.sync({
  force: true,
}).then(() => User.create({
  firstName: 'John',
  lastName: 'Hancock',
  email: 'me@me.com',
  favorites: '123123',
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
  User.findOrCreate({ where: { firstName: 'Josef', lastName: 'Butts', email: 'email@email.com' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true,
      }));
      console.log(created);
    });
})
  .then(() => {
    // add teh same user again to test function - should return false
    User.findOrCreate({ where: { firstName: 'Josef', lastName: 'Butts', email: 'email@email.com' } })
      .spread((user, created) => {
        console.log(user.get({
          plain: true,
        }));
        console.log(created);
      });
  });


Neighborhood.sync({
  force: true, // true drops database
}).then(() => Neighborhood.create({
  name: 'French Quarter',
  lat: 31,
  long: 91,
  fullPage: 'wertwuyiweurytwertweyrtiyweritwierutyiuwert',
  pois: '00000000',
})).then(() => Neighborhood.findOrCreate({ where : {
  name: 'Lake View',
  lat: 22,
  long: 90,
  fullPage: 'oioioiowieoiwoet',
  pois: 'wewewewe',
},
}))
  .then(() => {
    Neighborhood.findAll().then((neighborhoods) => {
      console.log('find all');
      neighborhoods.forEach((neighborhood) => {
        console.log(neighborhood.dataValues);
      });
      // console.log('findAll', users[0].dataValues);
    });
  });

Poi.sync({
  force: true, // true drops database
}).then(() => Poi.create({
  name: 'French Market',
  lat: 30,
  long: 90,
  address: 'Magazine St.',
  fullPage: 'some stuff goes here!!!',
})).then(() => Poi.create({
  name: 'Cafe Abysinnia',
  lat: 30,
  long: 90,
  fullPage: 'This food is incredible',
}))
  .then(() => {
    Poi.findAll().then((pois) => {
      console.log('find all');
      pois.forEach((poi) => {
        console.log(poi.dataValues);
      });
      // console.log('findAll', users[0].dataValues);
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

Poi.sync({
  force: true, // true drops database
}).then(() => Poi.create({
  name: 'French Market',
  lotNumber: 12345,
  lat: 30,
  long: 90,
  address: 'Magazine St.',
  infoText: 'some stuff goes here!!!',
}));


User.belongsToMany(Poi, {
  through: 'UserPoi',
});


module.exports = {
  sequelize,
  User,
  Poi,
  Vcs,
  Neighborhood,
};
