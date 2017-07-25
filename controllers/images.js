const Image = require('../models/image');
const runFacialRecognition = require('../lib/clarifai');


function indexRoute(req, res) {
  res.render('statics/index' );
}
function showRoute(req, res) {
  res.render('statics/show' );
}

function resultsRoute(req, res) {

  // console.log('req.body', req.body);
  // console.log('req.bodyall', req);

  // console.log('reQ body results', req.body.results);
  // console.log('reS body results', res.body.results);
  res.render('statics/results' );
}

function createRoute(req, res, next) {
  runFacialRecognition(req.file.location)
    .then((attributes) => {


      const data = req.body.results = attributes.outputs[0].data.regions[0].data.face;

      const totalAge = attributes.outputs[0].data.regions[0].data.face.age_appearance.concepts.slice(0, 5).reduce((accumulator, object, index) => {

        return parseInt(object.name) + accumulator
      }, 0);

      const averageAge =  Math.round(totalAge / 5);

      const gender = attributes.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name;
      let ageGroup = null;
      switch (true) {
        case averageAge < 25:
          ageGroup =  '16 - 24';
          break;
        case averageAge < 35:
          ageGroup =  '25 - 34';
          break;
        case averageAge < 51:
          ageGroup =  '35 - 50';
          break;
        default:
          ageGroup =  'Over 50';
      }
      console.log('data', data.age_appearance.concepts[0]);
      res.render('statics/show', { data, ageGroup, gender })
      // res.render('statics/show', { age: attributes.outputs[0].data.regions[0].data.face })
    })
    .catch((err) => {
      if(err.name === 'ValidationError') res.badRequest('/', err.toString());
      next(err);
    });
}

module.exports = {
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  results: resultsRoute
};
