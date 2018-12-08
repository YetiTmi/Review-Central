var db = require('../app/database');
//To do:
/*
Delete finsih
update finish
like button to do
Timestamp
*/
const multer = require('multer');
const resize = require('../app/resize');
const upload = multer({ dest: 'public/uploads/' });
const connection = db.connect();

const cb = (result, res) => {
  res.send(result);
};

connection.query('USE test');
//everything is exported
module.exports = (app, passport) => {
  //main site

  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  //when login is pressed this will start and it renders login.ejs view.
  app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });
  //login if succes or failure
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/Mainfeed',
    failureRedirect: '/login',
    failureFlash: true
  }),
    (req, res) => {
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });
  //signup site where user are created. first renders the signup.ejs page
  app.get('/signup', (req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
  //redirect depends if succes or failure
  app.post('/signup', 
  passport.authenticate('local-signup',
    {
    successRedirect: '/Mainfeed',
    failureRedirect: '/signup',
    failureFlash: true,
}));

  //if user isLoggedIN, will render the main feed page where reviews are created
  app.get('/Mainfeed', isLoggedIn, (req, res) => {
    console.log(req.user.id);
    res.render('Mainfeed.ejs', {
      user: req.user
    });
  });
  app.use('/likeImage', (req, res) => {
    data = {
      user: req.user.username,
      image_id: req.query.id
    }
    db.addLikeToPost(data, connection);
    res.redirect('/Mainfeed')
  });


    app.post('/search', (req, res, next) =>{
        console.log('search post');
        next();
    });

    app.use('/search:rating', (req, res, next) => {
        console.log('searching...');
        console.log(req.body.rating);
        var data = {
            star: req.body.rating,
        };
        db.ratingSearch(data, connection, next);
        //res.redirect('/');
    });


    app.post('/phone', (req, res, next) =>{
        console.log('phone post');
        next();
    });

    app.use('/phone:category', (req, res, next) => {
        console.log('phone category...');
        console.log(req.body.category);
        var data = {
            cat: req.body.phone,
        };
        console.log(data);
        db.search(data, connection, next);
        //res.redirect('/');
    });

    app.post('/television', (req, res, next) =>{
        console.log('television post');
        next();
    });

    app.use('/television:category', (req, res, next) => {
        console.log('television category...');
        console.log(req.body.category);
        var data = {
            cat: req.body.television,
        };
        console.log(data);
        db.search(data, connection, next);
        //res.redirect('/');
    });
    app.post('/computer', (req, res, next) =>{
        console.log('computer post');
        next();
    });

    app.use('/computer:category', (req, res, next) => {
        console.log('computer category...');
        console.log(req.body.category);
        var data = {
            cat: req.body.computer,
        };
        console.log(data);
        db.search(data, connection, next);
        //res.redirect('/');
    });
    app.post('/tablet', (req, res, next) =>{
        console.log('tablet post');
        next();
    });

    app.use('/tablet:category', (req, res, next) => {
        console.log('tablet category...');
        console.log(req.body.category);
        var data = {
            cat: req.body.tablet,
        };
        console.log(data);
        db.search(data, connection, next);
        //res.redirect('/');
    });



 //get fetch
  //upload--happens in the main feed
  app.post('/upload', upload.single('mediafile'), (req, res, next) => {
    next();
  });
  app.use('/upload', (req, res, next) => {
    resize.doResize(req.file.path, 300,
      './public/thumbs/' + req.file.filename + '_thumb', next);
  });
  app.use('/upload', (req, res, next) => {
    resize.doResize(req.file.path, 640,
      './public/medium/' + req.file.filename + '_medium', next);
  });
  // insert to database
  app.use('/upload', (req, res, next) => {
    const data = [
        req.body.product.toUpperCase(),
        req.body.price + '€',
        req.body.category,
        req.body.star,
        req.user.username,
        req.file.filename + '_thumb',
        req.file.filename + '_medium',
        req.file.filename + '.jpg',
    ];
    const user = {username:  req.user.username}
    db.insert(data, connection, next, user);
  });
  app.use('/upload', (req, res) => {
    db.select(connection, cb, res);
  });

    app.use('/search', (req, res) =>{
        db.select(connection, cb, res);
    });

    app.use('/phone', (req, res) =>{
        db.select(connection, cb, res);
    });

    app.use('/television', (req, res) =>{
        db.select(connection, cb, res);
    });

    app.use('/computer', (req, res) =>{
        db.select(connection, cb, res);
    });

    app.use('/tablet', (req, res) =>{
        db.select(connection, cb, res);
    });

    
  app.get('/images', (req, res) => {
    db.select(connection, cb, res);
  });

  //profile page
  app.get('/profile',isLoggedIn, (req, res) => {
    res.render('profile');
  });

  app.use('/delete', (req, res) => {
    var data = { id: req.query.id }
    console.log("delete: " + JSON.stringify(data) + req.id);
    res.redirect('/profile');
  });

  app.use('/update', (req, res) => {
    console.log(req.query);
    var data = {
      product: req.query.product,
      price: req.query.price,
      year: req.query.year,
      model: req.query.model,
      id: req.query.id
    }
    db.change(data, connection);
    res.redirect('/profile')
  });

  app.get('/userPosts', (req, res) => {
    db.userPosts(connection, cb, res, req.user);
  });

  app.get('/user_likes', (req, res) => {
    db.selectUserLikes(connection, cb, res, req.user.username);
  });
  //get the right profile
  app.get('/users', (req, res) => {
    db.getUser(connection, req.user.id, cb, res);
  });
  //logout whenever /logout is pressed
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })
};
//function to determinate if user is logged in or out.
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}