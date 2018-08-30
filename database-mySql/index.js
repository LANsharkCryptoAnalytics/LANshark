const Sequelize = require('sequelize');

// The below is required in this file only to enable the testing of the
// addFavorite function at the bottom
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
    type: Sequelize.STRING(1500),
  },
  narrow: {
    type: Sequelize.STRING(1500),
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

// Force: true will drop the table if it already exists
User.sync({
  force: false,
})
  .then(() => {
    console.log('User synced');
  })
  .catch((error) => {
    throw error;
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
    type: Sequelize.STRING,
  },
  long: {
    type: Sequelize.STRING,
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
  // Associate the users id as a foreign key with the favorite
  Favorite.belongsTo(User, { foreignKey: 'id' });
})
  .catch((error) => {
    throw (error);
  });

module.exports = {
  sequelize,
  User,
  Favorite,
  Vcs,
};
