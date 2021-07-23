// get the client
const mysql = require('mysql2');
 

// create the connection to database
// dbhostname = 127.0.0.1
// dbport = 3306
const dbConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: "3306",
    password: 'admin',
    database: 'FDB',
    multipleStatements: true,
});

// Tests connection to database
dbConnection.connect((error) => {
    if (!error){
        console.log("Connected to database")
    }else{
        console.log("Database connection failed")
    }
})

module.exports = dbConnection;