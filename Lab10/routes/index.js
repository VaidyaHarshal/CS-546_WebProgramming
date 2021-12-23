const userRoutes = require('./users');

const constructorMethod = (app) => {
  app.use('/', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};

module.exports = constructorMethod;