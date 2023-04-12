const uuid = require('uuid').v4;

const verificationData = () => {
  const verificationToken = signToken(uuid());

  const verificationUrl = `${process.env.BASE_URL}/api/users/verify/${verificationToken}`;

  return { verificationToken, verificationUrl };
};

module.exports = verificationData;
