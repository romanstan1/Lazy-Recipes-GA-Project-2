const rp = require('request-promise');

function getRecipe(arrayOfIngredients) {
  return rp({
    method: 'GET',
    url: 'https://community-food2fork.p.mashape.com/search',
    qs: {
      key: process.env.FOOD2FORK_KEY,
      q: arrayOfIngredients.slice(0,2).toString()
    },
    headers: {
      'X-Mashape-Key': process.env.X_MASHABLE_KEY
    },
    json: true
  });
}



module.exports = getRecipe;
