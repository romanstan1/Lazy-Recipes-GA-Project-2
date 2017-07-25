const router = require('express').Router();
const images = require('../controllers/images');
const upload = require('../lib/upload');

router.route('/')
  .get(images.index)
  .post(upload.single('filename'), images.create);

router.route('/show')
  .get(images.show);

router.route('/results')
  .get(images.results);

module.exports = router; //export the function Router()
