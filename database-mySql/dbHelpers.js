const {
  User,
  Poi,
  Neighborhood,
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
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
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
}

// TODO: build out- adds an association to a particular place to a user
const addToUserFavorites = ((user, favoritesToAdd) => {
  // not tested yet
  console.log(`add to favorites, userName: ${user.firstName} ${user}`);
  // again untested and probably broken
  // user.favorites = user.favorites + favoritesToAdd;
});

// Creates a database entry for a given neighborhood
const createNeighborhood = ((neighborHoodInfo) => {
  console.log('createNeighborHood fired');
  return Neighborhood.findOrCreate({
    name: neighborHoodInfo.name,
    lat: neighborHoodInfo.lat,
    long: neighborHoodInfo.long,
    fullPage: neighborHoodInfo.fullPage,
    pois: neighborHoodInfo.pois,
  });
});

// creates a database entry for a point of interest
const createPoi = ((poiInfo) => {
  console.log('createPoi fired');
  return Poi.findOrCreate({ where: {
    name: poiInfo.name,
    lat: poiInfo.lat,
    long: poiInfo.long,
    address: poiInfo.address,
    fullPage: poiInfo.fullPage,
  } 
});

// creates a database entry for the  vieux carre
// TODO: build out the function
const createVcs = ((vcsInfo) => {
  console.log('createVcs fired');
  return Vcs.findOrCreate({ where :{
    lotNumber : vcsInfo.lotNumber,
    name: vcsInfo.name,
    lat: vcsInfo.name,
    long: vcsInfo.long,
    address: vcsInfo.address,
    infoText: vcsInfo.text,
    ownership: vcsInfo.ownership,
  }
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
  createPoi,
  createVcs,
  // findUserFavorites
};
