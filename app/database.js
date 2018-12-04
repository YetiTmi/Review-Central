/*
Team yeti
this module ables the acces to the database.
*/

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

//connection
const connect = () => {
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
        
//login {!!!!!!!!!!!!!!!!!!!!!!!!!! req.flashes are not working properly}
/*const logUser = (req, connection,password, username,done) =>{
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
    }*/
//getAllUsers.....
const getUser = (connection,user_id, callback, res) => {
    connection.query('SELECT * FROM users1 WHERE id = ?;',[user_id],
    (err,results, fields) => {
        if(err) console.log(err);
        callback(results, res);
    }
    );
};
const insert = (data, connection, next)=>{
    connection.query('INSERT INTO uploaded(product, price,category, stars, owner,thumbnail, image, original) VALUES (?,?,?,?,?,?,?,?);',
    data,
    (err, results, fields)=> {
        if(err) console.log(err);
        next();
    },
    )};

    const select = (connection, callback, res) => {
        connection.query(
            'SELECT * FROM uploaded',
            (err, results, fields) => {
              if(err) console.log(err);
              callback(results, res);
            }
        );
    };

    const userPosts = (connection, callback, res, user) =>{
        console.log('users own posts');
        connection.query('SELECT * FROM uploaded WHERE owner = ?', [user.username],
        (err, results) =>{
            if(err) console.log(err)
            callback(results, res);
        }
        )
    };
    const change = (data, connection) => {
        // simple query
        connection.query(
          'UPDATE uploaded SET product = ?, price = ?, year = ?, model = ? WHERE id = ?',[data.product, data.price, data.year, data.model, data.id],
          //'UPDATE images SET category = \''+data.cat+'\',title = \''+data.title+'\', details = \''+data.details+'\' WHERE id = \''+data.id +'\';',
            (err, results, fields) => {
                  if(err) console.log(err);    
            },
        );
      };

      const addLike = (data, connection) => {
          console.log(data.user, data.image_id);
        connection.query(
            'INSERT INTO save_like(Username,Review_id) VALUES (?,?);',[data.user,  data.image_id],
            (err, results, fields) => {
                if(err) console.log(err);
            }
        );
      };

      const addLikeToUser =(data, connection) => {
        connection.query(
            'UPDATE users1 SET posts = posts + 1 WHERE id = ?', data,
            (err, results, fields) => {
                if(err) console.log(err);
            }
        );
      };

      const addLikeToPost =(data, connection) => {
        console.log("addLikeToPost: "+ data);
        connection.query(
            'UPDATE uploaded SET likes = likes + 1 WHERE id = ?',data,
            (err, results, fields) => {
                if(err) console.log(err);
            }
        );
      };

module.exports = {
    connect: connect,
    deSerial: deSerial,
    findUser: findUser,
    newUser: newUser,
    getUser: getUser,
    insert: insert,
    select: select,
    userPosts: userPosts,
    change: change,
    addLike, addLike,
    addLikeToUser: addLikeToUser,
    addLikeToPost:addLikeToPost
}