const { User, Poi, Neighborhood,  sequelize } = require('./index.js');



findUser = (userInfo) => {
    console.log('-----------------------------');
    console.log("findUser, user sought: ", userInfo)
    return User.findOne({ where: {email: userInfo.email} }).then( user => {
        console.log('userFound', user);
        return user;
    })
}

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

addToUserFavorites = ((user, favoritesToAdd) => {
    // not tested yet
    console.log(`add to favorites, userName: ${user.firstName} ${user}`);
    // again untested and probably broken
    // user.favorites = user.favorites + favoritesToAdd;
   
});

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


//not sure if we're going to need this but...
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


module.exports = {
    createUser,
    findUser,
    addToUserFavorites,
    createNeighborhood,
    createPoi

};