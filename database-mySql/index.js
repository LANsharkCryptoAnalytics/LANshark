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

const Neighborhood = sequelize.define('neighborHood', {
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
    unique: true,
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
  address: {
    type: Sequelize.STRING
  },

  fullPage: {
    type: Sequelize.STRING,
    // unique: true
  },
});


// force: true will drop the table if it already exists
User.sync({
    force: false
  }).then(() => {
    // Table created
    //sample user made here
    // return User.create({
    //   firstName: 'John',
    //   lastName: 'Hancock',
    //   email: 'me@me.com',
    //   favorites: '123123'
    // });
    return;
  }).then(() => {
    // return Neighborhood.create({
    //   name: 'Garden District',
    //   lat: 30 ,
    //   long: 90,
    //   fullPage: 'wertwetrwertiweytiuweyrtiwyertiuyiweurytwertweyrtiyweritwierutyiuwert', 
    //   pois:  '23445'
    // });
    return;
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

  
  Neighborhood.sync({
    force: false //true drops database
  }).then(() => {
    // return Neighborhood.create({
    //   name: 'French Quarter',
    //   lat: 31 ,
    //   long: 91,
    //   fullPage: 'wertwuyiweurytwertweyrtiyweritwierutyiuwert', 
    //   pois:  '00000000'
    // })
    return;
  }).then(() => {
    // return Neighborhood.create({
    //   name: 'Lake View',
    //   lat: 22 ,
    //   long: 90,
    //   fullPage: 'oioioiowieoiwoet', 
    //   pois:  'wewewewe'
    // });
    return;
    
  })
  .then(() => {
    Neighborhood.findAll().then((neighborhoods) => {
      console.log('find all');
      neighborhoods.forEach((neighborhood) => {
        console.log(neighborhood.dataValues);
      })
      // console.log('findAll', users[0].dataValues);
    });
  });

  Poi.sync({
    force: false //true drops database
  }).then(() => {
    return Poi.create({
      name: 'French Market',
      lat: 30,
      long: 90,
      address: "Magazine St.",
      fullPage: "some stuff goes here!!!", 
    });
  }).then(() => {
    return Poi.create({
      name: 'Cafe Abysinnia',
      lat: 30,
      long: 90,
      fullPage: "This food is incredible", 
    });
    
  })
  .then(() => {
    Poi.findAll().then((pois) => {
      console.log('find all');
      pois.forEach((poi) => {
        console.log(poi.dataValues);
      })
      // console.log('findAll', users[0].dataValues);
    });
  });


module.exports = {
  sequelize,
  User, 
  Poi
};