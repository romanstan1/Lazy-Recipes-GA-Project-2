const router = require('express').Router();
const images = require('../controllers/images');
const upload = require('../lib/upload');

router.route('/')
  .get(images.index)
  .post(upload.single('filename'), images.create);

router.route('/show')
  .get(images.show);

module.exports = router; //export the function Router()
