exports.currentUser = (req, res) => {

  const { email, subscription } = req.user;
  
  res.status(200).json({
    email,
    subscription,
  });
};
