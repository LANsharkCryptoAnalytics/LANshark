const { User, Poi, Neighborhood,  sequelize } = require('./index.js');



findUser = (userInfo) => {
    //works and find the user by email- postman tested w email in header
    console.log('currently looking for headers for info may need to be changed');
    console.log('-----------------------------');

    console.log("findUser, user sought: ", userInfo)
    return User.findOne({ where: {email: userInfo.email} }).then( user => {
        console.log('userFound', user);
        return user;
    })
}

createUser = (userInfo, sequelize) => {
    console.log('create user fired userInfo:', userInfo);
     return User.create({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        favorites: userInfo.favorites //maybe must be an array of strings-foreign keys
      });
}

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

addToUserFavorites = ((user, favoritesToAdd) => {
    // not tested yet
    console.log(`add to favorites, userName: ${user.firstName} ${user}`);
    // again untested
    user.favorites = user.favorites + favoritesToAdd;
    // user.update({ title: 'foooo', description: 'baaaaaar'}, {fields: ['title']}).then(() => {
    // });
});


//not sure if we're going to need this but...
createPoi = ((poiInfo)=>{
    console.log('createPoi fired');
    return Poi.create({
        name: poiInfo.name,
        lat: poiInfo.lat,
        long: poiInfo.long,
        fullPage: poiInfo.fullPage, 
      });
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



module.exports = {
    createUser,
    findUser,
    addToUserFavorites,
    createNeighborhood,
    createPoi

};