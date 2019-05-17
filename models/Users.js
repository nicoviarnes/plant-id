const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date_registered: {
    type: Date,
    default: Date.now
  },
  available_api_calls: {
    type: Number,
    default: 5
  }
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
