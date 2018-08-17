const { User, sequelize } = require('./index.js');

// console.log(sequelize);
// console.log("db", db);

createUser = (userInfo, sequelize) => {

     return User.create({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        favorites: userInfo.favorites //must be an array of strings-foreign keys
      });
}

module.exports = {
    createUser
};