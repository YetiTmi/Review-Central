'use strict';
var LocalStrategy = require("passport-local").Strategy;

var bcrypt = require('bcrypt-nodejs');
var db = require('../app/database');
const connection = db.connect();

connection.query('USE test');

module.exports = (passport) => {
 passport.serializeUser((user, done)=>{
  done(null, user.id);
 });

 passport.deserializeUser((id, done)=>{
  db.deSerial(connection,id,done);
 });

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  (req, username, password,/*email, interest,*/done)=>{
   connection.query("SELECT * FROM users1 WHERE username = ? ", 
   [username], (err, rows)=>{
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{
     var newUserMysql = {
      username: username,
      password: bcrypt.hashSync(password, null, null),
      posts: 0
     /* email: email,
      interest: interest*/
     };
     console.log("new USer:", newUserMysql);
     var insertQuery = "INSERT INTO users1 (Username, password, posts) values (?, ?, ?)";

     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.posts],
      (err, rows)=>{
        if(err) console.log(err);
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
 (req, username, password, done)=>{
  connection.query('SELECT * FROM users1 WHERE username = ?',[username],
  (err, rows)=>{
      if(err)
       return done(err);
      if(!rows.length){
       return done(null, false, req.flash('loginMessage', 'Check the username'));
      }
      if(!bcrypt.compareSync(password, rows[0].password))
      return done(null, false, req.flash('loginMessage', 'Wrong Password'));

      return done(null, rows[0]);
     });
  })
 );
};