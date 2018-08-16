const dbConfig = require('./config.js');
const Sequelize = require('sequelize');
// const user = require('./models/user.js')
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}/ARHISTORY`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

 const User = sequelize.define('user', {
     firstName: {
       type: Sequelize.STRING
     },
     lastName: {
       type: Sequelize.STRING
     },
     
     email: {
       type: Sequelize.STRING
     },
     favorites: Sequelize.STRING//needs to be an array of strings really
     //foreign keys etc.
   });

   // force: true will drop the table if it already exists
   User.sync({force: true}).then(() => {
     // Table created

     return User.create({
       firstName: 'John',
       lastName: 'Hancock',
       email: 'me@me.com',
       favorites: '123123'
     });
   }).then(()=>{
    User.findAll().then((users)=> {
      console.log('findAll', users[0].dataValues);
    }
   );
  });

  //  User.findAll().then(console.log('findAll'));
  
  //  User.findAll().then(users => {
    //    console.log('users', users);
    //  })
    
    
    module.exports = {
      sequelize,
      User
      //poi goes here 
    };
