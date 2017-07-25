const mongoose = require('mongoose');

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

module.exports = mongoose.model('Image', imageSchema);
