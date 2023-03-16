const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 30,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      require: true,
    },
    phone: {
      type: String,
      trim: true,
      require: true,
    },
    favorite: {
      type: Boolean,
      require: true,
      select:false,
    },
  },
  { versionKey: false, timestamps: false }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
