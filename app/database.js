var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

const connect = () => {
    // create the connection to database
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS
    });
    return connection;
};
//deSerial
const deSerial = ((connection,id,done,res) => {
        connection.query("SELECT * FROM users1 WHERE id = ? ", [id],
        (err, rows)=>{
            done(err, rows[0]);
           });
           
         });
//find if user exists
const findUser = (connection,username) => {
    connection.query('SELECT * FROM users1 WHERE username = ?',[username]
    )
};
//new user
const newUser = (connection, newUserMysql, insertQuery) =>{
    connection.query(insertQuery, [newUserMysql.username, newUserMysql.password]
        )};
        
//login
const logUser = (req, connection,password, username,done) =>{
    connection.query('SELECT * FROM users1 WHERE username = ?',[username],
    (err, rows)=>{
        if(err)
         return done(err);
        if(!rows.length){
         return done(null, false, req.flash('loginMessage', 'No User Found'));
        }
        if(!bcrypt.compareSync(password, rows[0].password))
         return done(null, false, req.flash('loginMessage', 'Wrong Password'));
    
        return done(null, rows[0]);
       });
    }

const getUser = () => {


};
module.exports = {
    connect: connect,
    deSerial: deSerial,
    findUser: findUser,
    newUser: newUser,
    logUser: logUser,
    getUser: getUser
}