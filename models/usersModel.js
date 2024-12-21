const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// const { type } = require("os");
const DB = "mongodb://localhost:27017/Trial";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

const usersSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  name: { type: String, required: [true, "Name is required"] },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
});
const User = mongoose.model("User", usersSchema);

module.exports = User;
