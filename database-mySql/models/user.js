// const Sequelize = require('sequelize');
// const sequelize = require('../index.js');


// console.log(sequelize);
// // console.log('user.js being run');

//  const User = sequelize.define('user', {
//      firstName: {
//        type: Sequelize.STRING
//      },
//      lastName: {
//        type: Sequelize.STRING
//      },
//      email: {
//        type: Sequelize.STRING
//      },
//      favorites: Sequelize.STRING
//    });
//    // force: true will drop the table if it already exists
//    User.sync({force: true}).then(() => {
//      // Table created
//      return User.create({
//        firstName: 'John',
//        lastName: 'Hancock'
//      });
//    });

//   //  var Project = sequelize.define('Project', {
//   //   title:       Sequelize.STRING,
//   //   description: Sequelize.TEXT
//   // });

//    User.findAll().then(users => {
//      console.log('testing');
//    })

// // //   
  
  
// // //   sequelize
// // //     .authenticate()
// // //     .then(() => {
// // //       console.log('Connection has been established successfully.');
// // //     })
// // //     .catch(err => {
// // //       console.error('Unable to connect to the database:', err);
// // //     });