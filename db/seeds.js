const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = 'mongodb://localhost/w04d05';
mongoose.connect(dbURI);

const User = require('../models/user');
const Rock = require('../models/rock');

User.collection.drop();
Rock.collection.drop();


User
  .create([{
    username: 'crazymike',
    email: 'mikey.crazy@email.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'whatevertrevor',
    email: 'whatever.trevor@email.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);
    return Rock
    .create([{
      name: 'Granite',
      rockFactor: 27,
      images: 'http://www.pitt.edu/~cejones/GeoImages/2IgneousRocks/IgneousCompositions/6Granite/GraniteSml.jpg'
    },{
      name: 'Limestone',
      rockFactor: 14,
      images: 'https://cdn.materia.nl/wp-content/uploads/2016/09/limex-limestone-material-to-replace-paper-and-plastic-01.jpg'
    },{
      name: 'The Rock',
      rockFactor: 1000,
      images: 'https://www.bodybuilding.com/images/2016/july/train-like-dwayne-the-rock-johnson-bigshot-v2-830x467.jpg'
    },{
      name: 'Hard Rock Cafe',
      rockFactor: 3.5,
      images: 'http://www.hardrock.com/cafes/philadelphia/files/2435/Philadelphia_Entrance.jpg'
    },{
      name: 'Rock a bye Baby',
      rockFactor: 0,
      images: 'http://3.bp.blogspot.com/-sKszPm743I8/ThN0dsvQApI/AAAAAAAAAgU/dyCG09wQgUE/s1600/rockabye-baby.gif'
    }]);
  })
  .then((rocks) => {
    console.log(`${rocks.length} rocks created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
