const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const images = require('../controllers/images');

const upload = require('../lib/upload');


router.get('/', (req, res) => res.render('statics/index'));

router.route('/register')
  .post(registrations.create);

router.route('/images')
  .get(images.index)
  .post(upload.single('filename'), images.create);

router.route('/images/new')
  .get(images.new);

router.route('/images/:id')
  .get(images.show)
  .delete(images.delete);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);
//

router.route('/user/:id')
  .get(sessions.show)
  .put(sessions.update);

router.route('/users/edit')
  .get(sessions.edit);

//
router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router; //export the function Router()