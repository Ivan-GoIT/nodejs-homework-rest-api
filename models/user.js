const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const  signToken = require('../utils/signToken');
const userSubscriptionEnum = require('../constants/userSubscriptionEnum');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: {
      type: String,
      select: false,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required'],
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscriptionEnum),
      default: userSubscriptionEnum.STARTER,
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, 'Verify token is required'],
    // },
  },
  { versionKey: false, timestamps: false }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=monsterid`;

    this.token = signToken(this.id);
  }

  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

const User = mongoose.model('User', userSchema);
module.exports = User;
