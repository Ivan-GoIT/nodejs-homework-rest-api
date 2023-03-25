// const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 30,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Duplicate email"],
      require: [true, "Email is required"],
    },
    phone: {
      type: String,
      trim: true,
      require: [true, "Phone is required"],
    },
    favorite: {
      type: Boolean,
      select: true,
      default: false,
      require: true,
    },
    // owner: {
    //   type: ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false, timestamps: false }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
