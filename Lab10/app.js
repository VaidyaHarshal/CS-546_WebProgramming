const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.use(async(req, res, next) => {
  let timeStamp = new Date().toUTCString();
  let authenticatedUser = "(Non-Authenticated User)";

  if(req.session.user)
    authenticatedUser = "(Authenticated User)";

  console.log("[" + timeStamp + "]:", req.method, req.originalUrl, authenticatedUser);
  next();
})

app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('users/private', {hasErrors: true, error: "User is not logged in, please login."});
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});