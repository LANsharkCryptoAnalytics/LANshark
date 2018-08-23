const {
    User,
    Poi,
    Neighborhood,
    sequelize
} = require('./index.js');


//finds a user
findUser = (userInfo) => {
    console.log('-----------------------------');
    console.log("findUser, user sought: ", userInfo)
    return User.findOne({
        where: {
            email: userInfo.email
        }
    }).then(user => {
        console.log('userFound', user);
        return user;
    })
}

//TODO:function to create a new user- 
//needs to be built out and tested
createUser = (user, sequelize) => {
    console.log('create user fired userInfo:', user);
    User.findOrCreate({
            where: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
        })
        .spread((user, created) => {
            console.log(user.get({
                plain: true
            }))
            console.log(created)

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
        })
}

//TODO: build out- adds an association to a particular place to a user
addToUserFavorites = ((user, favoritesToAdd) => {
    // not tested yet
    console.log(`add to favorites, userName: ${user.firstName} ${user}`);
    // again untested and probably broken
    // user.favorites = user.favorites + favoritesToAdd;

});

//Creates a database entry for a given neighborhood
createNeighborhood = ((neighborHoodInfo) => {
    console.log('createNeighborHood fired');
    return Neighborhood.create({
        name: neighborHoodInfo.name,
        lat: neighborHoodInfo.lat,
        long: neighborHoodInfo.long,
        fullPage: neighborHoodInfo.fullPage,
        pois: neighborHoodInfo.pois
    });
});

//creates a database entry for a point of interest
createPoi = ((poiInfo) => {
    console.log('createPoi fired');
    return Poi.create({
        name: poiInfo.name,
        lat: poiInfo.lat,
        long: poiInfo.long,
        address: poiInfo.address,
        fullPage: poiInfo.fullPage,
    });
});

//creates a database entry for the  vieux carre
//TODO: build out the function
createVcs = ((vcsINfo) => {
    console.log('createVcs fired');
    return Vcs.create({
        //load up vcs model here

    })
})


//TODO: build out this query after building the addToFavorites function
//queries the database to find a given users favorites list
//findUserFavorites

module.exports = {
    createUser,
    findUser,
    addToUserFavorites,
    createNeighborhood,
    createPoi,
    createVcs
    //findUsFavorites
};