const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const connection = mysql.createConnection(mysqlConfig);



connection.connect( (err)=>{
  console.log('attempting to connect to database');
  if (err) { 
    console.error(err); 
    return;  
  }
  console.log( "connected to database" );
});

module.exports = connection; 
