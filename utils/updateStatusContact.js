const Contact = require('../models/contact');

exports.updateStatusContact = async (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, { favorite: body }, { new: true });
