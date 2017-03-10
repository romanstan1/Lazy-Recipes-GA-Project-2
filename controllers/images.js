// standard RESTful routes
const Image = require('../models/image');
const runFoodRecognition = require('../lib/clarifai');
const food2fork = require('../lib/food2fork');


//new Image Page
function newRoute(req, res) {
  res.render('images/new');
}

// create Image
function createRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;
  req.body.createdBy = req.user;

  runFoodRecognition(req.file.location)
    .then((ingredients) => {
      req.body.ingredients = ingredients;
      return Image.create(req.body);
    })
    // .then((image) => {
    //   food2fork(image.ingredients);
    //   console.log(image);
    //   return image;
    // })
    .then(() => res.redirect('/'))
    .catch((err) => {
      if(err.name === 'ValidationError') res.badRequest('/images/new', err.toString());
      next(err);
    });
}

// show discover page
function indexRoute(req, res) {
  Image
    .find(req.query)
    .sort({updatedAt: 'desc'})
    .exec()
    .then((images) => {
      res.render('statics/index', { images });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

// show route
function showRoute(req, res) {
  Image
    .findById(req.params.id)
    .exec()
    .then((image) => {
      if(!image) return res.status(404).send('Not found');
      console.log(image.ingredients);
      return food2fork(image.ingredients)
        .then((result) => {
          const recipes = result.recipes.slice(0,5);
          res.render('images/show', { image, recipes });
        });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function deleteRoute(req, res) {
  Image
    .findById(req.params.id)
    .exec()
    .then((image) => {
      if(!image) return res.status(404).send('Not found');
      return image.remove();
    })
    .then(() => {
      res.redirect(`/users/${req.user.id}`);
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  delete: deleteRoute
};
