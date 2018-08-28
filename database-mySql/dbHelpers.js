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

// const comparePassword = (user, hash, callback) => {
//   console.log('112221112221111222211111222111', user);
//   const password = user.dataValues.password;
//   bcrypt.compare(password, hash, (err, res) => {
//     console.log('hash     mnbvcxzzxcvbnmmnbvcxzzxcvbnm', hash);
//     console.log('res      123456789poiuytrewqasdfghjkl', res);
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(res);
//       return callback(err, res);
//     }
//   });
// };

const comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    console.log('hashhhhhhhhhhhhhhhhhhhhhhhhhhh', hash);
    console.log('isMatcccccccccccccccccccccccccchhhhh', isMatch);
    if (err) throw err;
    callback(null, isMatch);
  });
};

const findUserSignup = userInfo => User.findOne({
  where: {
    email: userInfo.email,
  },
})
  .then((user) => {
    if (user === null) {
      return '1';
    }
    return 'false';
  })
  .catch((err) => { throw err; });

const hashPassword = (userInfo) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userInfo.password, salt, (error, hash) => {
      // Store hash in your password DB.
      if (error) {
        throw error;
      }
      User.create({
        username: userInfo.username,
        email: userInfo.email,
        password: hash,
      })
        .then((response) => {
          console.log('dbHelpers - 0000000000000000000000000', response);
          return response.dataValues;
        })
        .catch((errorr) => { throw errorr; });
    });
  });
};

// .then((user) => {
//   console.log('dbHelpers => findUserSignup => then() !!!!!!!!!!!!!!!', user);
//   if (user === null) {
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(userInfo.password, salt, (error, hash) => {
//         // Store hash in your password DB.
//         if (error) {
//           throw error;
//         }
//         User.create({
//           username: userInfo.username,
//           email: userInfo.email,
//           password: hash,
//         })
//           .then((response) => {
//             console.log('0000000000000000000000000', response);
//             return user;
//           })
//           .catch((errorr) => { throw errorr; });
//       });
//     });
//   } else {
//     return user;
//   }
// })
// .catch((e) => { throw e; });

// TODO:function to create a new user
// needs to be built out and tested
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
  comparePassword,
  hashPassword,
  findUserLogin,
  findUserSignup,
  addToUserFavorites,
  createVcs,
  findUserFavorites,
};
