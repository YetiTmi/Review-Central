module.exports = (app, passport) => {
 app.get('/', (req, res) =>{
  res.render('index.ejs');
 });

 app.get('/login', (req, res) => {
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/Mainfeed',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

 app.get('/signup', (req, res) =>{
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/Mainfeed',
  failureRedirect: '/signup',
  failureFlash: true
 }));

 app.get('/Mainfeed', isLoggedIn, (req, res) =>{
     console.log(req.user);
  res.render('Mainfeed.ejs');
 });
 app.get('/profile', (req,res) => {
     res.render('profile', {
        
     });
 });

 app.get('/logout', (req,res) =>{
  req.logout();
  res.redirect('/');
 })
};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}