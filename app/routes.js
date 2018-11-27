
//everything is exported
module.exports = (app, passport) => {
 //main site
    app.get('/', (req, res) =>{
  res.render('index.ejs');
 });

 //when login is pressed this will start and it renders login.ejs view.
 app.get('/login', (req, res) => {
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });
//login if succes or failure
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
//signup site where user are created. first renders the signup.ejs page
 app.get('/signup', (req, res) =>{
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });
//redirect depends if succes or failure
 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/Mainfeed',
  failureRedirect: '/signup',
  failureFlash: true
 }));
//if user isLoggedIN, will render the main feed page where reviews are created
 app.get('/Mainfeed', isLoggedIn, (req, res) =>{
     console.log(req.user);
  res.render('Mainfeed.ejs');
 });





//profile page
 app.get('/profile', (req,res) => {
     res.render('profile', {
        
     });
 });
//logout whenever /logout is pressed
 app.get('/logout', (req,res) =>{
  req.logout();
  res.redirect('/');
 })
};
//function to determinate if user is logged in or out.
function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}