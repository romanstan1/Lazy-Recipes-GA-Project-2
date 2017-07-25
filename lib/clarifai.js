const Clarifai = require('clarifai');
// const app = new Clarifai.App(process.env.CLARIFAI_CLIENT_ID, process.env.CLARIFAI_CLIENT_SECRET);
const app = new Clarifai.App({apiKey: process.env.CLARIFAI_APP_KEY});


function runFacialRecognition(url) {
  return app.models
    .predict(Clarifai.DEMOGRAPHICS_MODEL, url)
    .then((response, err) => {

      return response;
    });
}

module.exports = runFacialRecognition;
