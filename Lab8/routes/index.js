const charRoutes = require('./characters');

const constructorMethod = (app) => {
  app.use('/', charRoutes);
  
  app.use('*', (req, res) => {
    res.status(404).render('characters/errors', {error: 'Page Not Found'});
  });
};

module.exports = constructorMethod;