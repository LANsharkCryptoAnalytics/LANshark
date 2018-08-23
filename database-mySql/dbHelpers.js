const { User, Poi, Neighborhood,  sequelize } = require('./index.js');


//finds a user
findUser = (userInfo) => {
    console.log('-----------------------------');
    console.log("findUser, user sought: ", userInfo)
    return User.findOne({ where: {email: userInfo.email} }).then( user => {
        console.log('userFound', user);
        return user;
    })
}

//TODO:function to create a new user- 
//needs to be built out and tested
createUser = (userInfo, sequelize) => {
    console.log('create user fired userInfo:', userInfo);
    // newUser = {
    //     firstName: userInfo.firstName,
    //     lastName: userInfo.lastName,
    //     email: userInfo.email,
    //     favorites: userInfo.favorites //maybe must be an array of strings-foreign keys
    // }
    // if (User.newUser.isNewRecord){
    //     console.log('is new record ?');
    // }
     return User.create({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        favorites: userInfo.favorites //maybe must be an array of strings-foreign keys
      });
}

//TODO: build out- adds an association to a particular place to a user
addToUserFavorites = ((user, favoritesToAdd) => {
    // not tested yet
    console.log(`add to favorites, userName: ${user.firstName} ${user}`);
    // again untested and probably broken
    // user.favorites = user.favorites + favoritesToAdd;
   
});

//Creates a database entry for a given neighborhood
createNeighborhood = ((neighborHoodInfo)=>{
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
createPoi = ((poiInfo)=>{
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
createVcs = ( (vcsINfo)=>{
    console.log('createVcs fired');
    return Vcs.create({
    //load up vcs model here

    })
} )


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