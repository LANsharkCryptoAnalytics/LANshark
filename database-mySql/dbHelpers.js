const { User, sequelize } = require('./index.js');



findUser = (userInfo) => {
    console.log("findUser, user: ", userInfo)
    User.findOne({ where: {email: userInfo.email} }).then( user => {
        console.log(user);
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

addToUserFavorites = ((user, favoritesToAdd) => {
    // not tested yet
    console.log(`add to favorites, userName: ${user.firstName} ${user}`);
    // again untested
    user.favorites = user.favorites + favoritesToAdd;
    // user.update({ title: 'foooo', description: 'baaaaaar'}, {fields: ['title']}).then(() => {
    // });
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
    return poi.create({
        name: poiInfo.name,
        lat: poiInfo.lat,
        long: poiInfo.long,
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