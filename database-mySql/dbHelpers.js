const {
  User,
  Favorite,
  Vcs,
} = require('./index.js');

// finds a user - if you want to do that sort of thing
const findUser = (userInfo) => {
  console.log('-----------------------------');
  console.log('findUser, user sought: ', userInfo);
  // searches by email since that is the unique identifier
  return User.findOne({
    where: {
      email: userInfo.email,
    },
  }).then((user) => {
    console.log('userFound', user);
    return user;
  });
};

// TODO:function to create a new user
// needs to be built out and tested
const createUser = (user) => {
  console.log('create user fired userInfo:', user);
  User.findOrCreate({
    where: {
      userName: user.userName,
      email: user.email,
      password: user.password,
      favorites: user.favorites,
    },
  })
    .spread((user, created) => {
      console.log(user.get({
        plain: true,
      }));
      console.log(created);
    });
};

// TODO: build out- adds an association to a particular place to a user
const addToUserFavorites = ((favorite, user) => {

  console.log(JSON.stringify(favorite));
  return Favorite.create({
    name: favorite.name,
    lat: favorite.latitude,
    long: favorite.longitude,
    latLong: `${favorite.latitude}${favorite.longitude}`,
    wide: JSON.stringify(favorite.wideData),
    narrow: JSON.stringify(favorite.narrowData),
    wideWiki: favorite.wideWiki,
    narrowWiki: favorite.narrowWiki,
    wikiImage: favorite.wikiImage,
    foreignKey: user.id,
  }).then(() => {
    console.log('favorite created');
  }).catch(() => {
    console.log('error in addToUserFavorites');
  });
});

const findUserFavorites = ((user) => {
  console.log(`finding user favorite for: ${user}`);
  return Favorite.findAll({
    where: {
      user: user.id,
    },
  });
});

// creates a database entry for the  vieux carre
// TODO: build out the function
const createVcs = ((vcsInfo) => {
  console.log('createVcs fired');
  return Vcs.findOrCreate({
    where: {
      lotNumber: vcsInfo.lotNumber,
      name: vcsInfo.name,
      lat: vcsInfo.name,
      long: vcsInfo.long,
      address: vcsInfo.address,
      infoText: vcsInfo.text,
      ownership: vcsInfo.ownership,
    },
    // load up vcs model here
  });
});

// TODO: build out this query after building the addToFavorites function
// queries the database to find a given users favorites list
// findUserFavorites

module.exports = {
  createUser,
  findUser,
  addToUserFavorites,
  createVcs,
  findUserFavorites,
};
