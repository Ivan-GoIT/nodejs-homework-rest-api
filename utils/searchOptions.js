const searchOptions = (favorite, name, email, phone) => {
  const searchObj = {};

  if (typeof favorite === "boolean"&& favorite !== undefined) searchObj.favorite = favorite;
  if (typeof name === "string" && name !== undefined)
    searchObj.name = { $regex: name, $options: "i" };
  if (typeof email === "string" && email !== undefined)
    searchObj.email = { $regex: email, $options: "i" };
  if (typeof phone === "string" && phone !== undefined)
    searchObj.phone = { $regex: phone, $options: "i" };

  return searchObj;
};

module.exports = searchOptions;
