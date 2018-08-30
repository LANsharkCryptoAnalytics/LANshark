const bcrypt = require('bcryptjs');

const {
  User,
  Favorite,
  Vcs,
} = require('./index.js');

// finds a user - if you want to do that sort of thing
const findUserLogin = userInfo => User.findOne({
  where: {
    email: userInfo.email,
  },
})
  .then(user => user)
  .catch((error) => { throw error; });

const comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

const canUserSignup = userInfo => User.findOne({
  where: {
    email: userInfo.email,
  },
})
  .then((user) => {
    if (user === null) {
      return 'true';
    }
    return 'false';
  })
  .catch((err) => { throw err; });

const hashPassword = (userInfo, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userInfo.password, salt, (error, hash) => {
      // Store hash in your password DB.
      if (error) {
        throw error;
      }
      return User.create({
        username: userInfo.username,
        email: userInfo.email,
        password: hash,
      })
        .then((user) => {
          callback(null, user);
        })
        .catch((errorr) => { callback(errorr); });
    });
  });
};

// TODO:function to create a new user
// needs to be built out and tested
// TODO: build out- adds an association to a particular place to a user
const addToUserFavorites = (favorite => Favorite.create({
  name: favorite.name,
  lat: favorite.latitude,
  long: favorite.longitude,
  latLong: `${favorite.latitude}${favorite.longitude}`,
  wide: JSON.stringify(favorite.wideData),
  narrow: JSON.stringify(favorite.narrowData),
  wideWiki: favorite.wideWiki,
  narrowWiki: favorite.narrowWiki,
  wikiImage: favorite.wikiImage,
  foreignKey: favorite.id,
}).then(() => {
  // console.log('favorite created');
}).catch((error) => {
  throw error;
}));

const findUserFavorites = (userId => Favorite.findAll({
  where: {
    foreignKey: userId,
  },
}));

// creates a database entry for the  vieux carre
// TODO: build out the function
const createVcs = (vcsInfo => Vcs.findOrCreate({
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
}));

// TODO: build out this query after building the addToFavorites function
// queries the database to find a given users favorites list
// findUserFavorites

module.exports = {
  comparePassword,
  hashPassword,
  findUserLogin,
  canUserSignup,
  addToUserFavorites,
  createVcs,
  findUserFavorites,
};
