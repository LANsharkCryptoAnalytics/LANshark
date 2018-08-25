const {
  User,
  Favorite,
  Neighborhood,
  Vcs,
} = require('./index.js');


// finds a user - if you want to do that sort of thing
const findUser = (userInfo) => {
  console.log('------------------ inside dbHelpers findUser');
  // console.log('findUser, user sought: ', userInfo);
  // searches by email since that is the unique identifier
  return User.findOne({
    where: {
      email: userInfo.email,
      password: userInfo.password,
    },
  })
    .then((user) => {
      console.log('userrrrrr in db.Helpers() => findUser()');
      console.log('uuuussssseeeeeerrrrrrrr', user.dataValues);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log('userInfoooooooooooooo', userInfo);
      
    })
    .catch((error) => {
      console.log('errrrrrroorrrrrrr', error);
      throw error;
    });
};

// TODO:function to create a new user
// needs to be built out and tested
const createUser = (user) => {
  // bcrypt hashing password here
  console.log(`create user fired userInfo, checking to see if ${user} already exists in db:`, user);
  const checkForUser = findUser(user)
    .then((userFound) => {
      console.log('User Foundddddddddddddddd', userFound);
      return 'User already exists';
    })
    .catch((error) => {
      throw error;
    });

  if (checkForUser === 'User already exists') {
    return 'User already exists';
  }
  console.log('User does not exist');
  return User.findOrCreate({
    where: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  })
    .spread((user, created) => {
      console.log(user.get({
        plain: true,
      }));
      console.log(created);
      /*
    findOrCreate returns an array containing the object that was found or created and a boolean that will be true if a new object was created and false if not, like so:
 
    [ {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      },
      true ]
 
  In the example above, the "spread" on line 39 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 39, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true".)
    */
    });
};
// TODO: build out- adds an association to a particular place to a user
const addToUserFavorites = ((favorite, user) => {

  console.log(JSON.stringify(favorite));
  return Favorite.create({
    name: favorite.name,
    lat: favorite.latitude,
    long: favorite.longitude,
    wide: JSON.stringify(favorite.wideData),
    narrow: JSON.stringify(favorite.narrowData),
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

// Creates a database entry for a given neighborhood
const createNeighborhood = ((neighborHoodInfo) => {
  console.log('createNeighborHood fired');
  return Neighborhood.findOrCreate({
    name: neighborHoodInfo.name,
    lat: neighborHoodInfo.lat,
    long: neighborHoodInfo.long,
    wide: neighborHoodInfo.fullPage,
    narrow: neighborHoodInfo.narrow,
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
  createNeighborhood,
  createVcs,
  findUserFavorites,
};
