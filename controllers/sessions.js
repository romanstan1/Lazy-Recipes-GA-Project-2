const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
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
      console.log('hit');
      if(!user) return res.status(404).send('Not found');
      res.render('sessions/show', { user });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete,
  show: showUser
};
