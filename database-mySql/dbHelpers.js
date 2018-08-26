const {
  User,
  Favorite,
  Vcs,
} = require('./index.js');

// finds a user - if you want to do that sort of thing
const findUser = userInfo => User.findOne({
  where: {
    email: userInfo.email,
  },
})
  .then(user => user)
  .catch((error) => { throw error; });

// TODO:function to create a new user
// needs to be built out and tested
const createUser = (userInfo) => {
  // bcrypt hashing password here
  findUser(userInfo)
    .then((user) => {
      if (user !== null) {
        console.log(`User already exists in db: ${user}`);
        return user;
      }
      console.log('USER HAS BEEN CREATED AND SAVED TO THE DB!!!!!!');
      User.create({
        where: {
          username: userInfo.username,
          email: userInfo.email,
          password: userInfo.password,
        },
      });
      return `Thank You for signing up ${userInfo.username}`;
    })
    .catch((error) => { throw error; });
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
      user: user.email,
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
