const Clarifai = require('clarifai');
const app = new Clarifai.App(process.env.CLARIFAI_CLIENT_ID, process.env.CLARIFAI_CLIENT_SECRET);

function runFoodRecognition(url) {
  return app.models
    .predict(Clarifai.FOOD_MODEL, url)
    .then((response) => {
      return response.outputs[0].data.concepts.splice(0,5).map((ingredient) => {
        return ingredient.name;
      });
    });
}

module.exports = runFoodRecognition;
