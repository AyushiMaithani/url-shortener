const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: "Enter a vaiid email",
    },
    password: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("User", userSchema);
