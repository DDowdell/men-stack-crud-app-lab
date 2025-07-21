const mongoose = require('mongoose');

const capSchema = new mongoose.Schema({
  name: String,
  isReadyToWear: Boolean,
});

const Cap = mongoose.model("Cap", capSchema); // create model

module.exports = Cap;

