const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSubscriptionEnum = require("../../constants/userSubscriptionEnum");
const { signToken } = require("../../utils");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscriptionEnum),
      default: userSubscriptionEnum.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.token=signToken(this._id)

  next();
});

userSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

const User = mongoose.model("User", userSchema);
module.exports = User;
