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
    // if (!findUser(userInfo)){
     return User.create({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        favorites: userInfo.favorites //must be an array of strings-foreign keys
      });
    // }
    // console.log('user already exists');
}

addToUserFavorites = ((user, favoritesToAdd) => {
    // not tested yet
    console.log(`add to favorites, userName: ${user.firstName} ${user}`);
    // again untested
    user.favorites = user.favorites + favoritesToAdd;
    // user.update({ title: 'foooo', description: 'baaaaaar'}, {fields: ['title']}).then(() => {
    // });
});

module.exports = {
    createUser,
    findUser,
    addToUserFavorites
};