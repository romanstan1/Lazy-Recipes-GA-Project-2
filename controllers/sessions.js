const User = require('../models/user');
const Image = require('../models/image');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsEdit(req, res) {
  res.render('sessions/edit');
}

function sessionsUpdate(req, res, next ) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.status(404).send('Not found');
      for(const field in req.body) {
        user[field] = req.body[field];
      }
      return user.save();
    })
    .then((user) => {
      res.redirect(`/user/${user.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        req.flash('alert', 'Passwords do not match');
        return res.redirect(`/user/${user.id}`);
      }
      next();
    });
}

function sessionsCreate(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('alert', 'Unknown email  /  password combination');
        return res.redirect('/login');
      }

      req.session.userId = user.id;
      req.session.isAuthenticated = true;

      req.user = user;

      req.flash('success', `Welcome back, ${user.id}!`);
      res.redirect(`/user/${user.id}`);
    })
    .catch(next);
}

function showUser(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      Image
        .find({createdBy: user.id})
        .sort({updatedAt: 'desc'})
        .exec()
        .then((images) => {
          console.log('hit');
          if(!user) return res.status(404).send('Not found');
          res.render('sessions/show', { user, images });
        })
        .catch((err) => {
          res.status(500).end(err);
        });
    });
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete,
  show: showUser,
  edit: sessionsEdit,
  update: sessionsUpdate
};
