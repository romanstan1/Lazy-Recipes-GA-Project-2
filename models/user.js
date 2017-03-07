const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const imageSchema = new mongoose.Schema({
  filename: { type: String },
  caption: { type: String },
  ingredients: { type: Array }
}, {
  timestamps: true
});

imageSchema.virtual('src')
  .get(function getImageSRC(){
    if(!this.filename) return null;
    return `https://s3-eu-west-1.amazonaws.com/wdi-25-project-2/${this.filename}`;
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: { type: String, required: true }
  // images: [ imageSchema ]
});

userSchema
  .virtual('passwordConfirmation')// virtual because we dont want to store it in the database, use it remporatilay by setting it onto the record temporatily without storing it
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });


//this is a lifecycle hook - mongoose middleware, this runs before mongoose trys to valdate the password in the userSchema ie (password: { type: String, required: true }), it fires this function before it validates because of .pre
userSchema.pre('validate', function checkPassword(next) {
  if(this._passwordConfirmation && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});


userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// A class is like the blue print, new Array() is the class, [] is the object instance
//methods is creating an instance method on the User
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
