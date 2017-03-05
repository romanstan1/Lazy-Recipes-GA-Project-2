const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/register')
  // .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/user/:id')
  .get(sessions.show);

router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router; //export the function Router()
