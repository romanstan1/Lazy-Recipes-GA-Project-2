const Image = require('../models/image');
const runFacialRecognition = require('../lib/clarifai');


function indexRoute(req, res) {
  res.render('statics/index' );
}
function showRoute(req, res) {
  res.render('statics/show' );
}

function createRoute(req, res, next) {
  runFacialRecognition(req.file.location)
    .then((attributes) => {
      console.log( 'DATA',  attributes.outputs[0].data.regions[0].data.face.age_appearance.concepts);


      const totalAge = attributes.outputs[0].data.regions[0].data.face.age_appearance.concepts.slice(0, 5).reduce((accumulator, object, index) => {
        console.log('age:',accumulator,'object:', object, 'index:', index);
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


      res.render('statics/show', { averageAge, ageGroup, gender })
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
  show: showRoute
};
