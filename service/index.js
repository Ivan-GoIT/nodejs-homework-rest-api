const Contact = require("./schemas/contact");

const getAllContacts = async () => Contact.find();

const getContactById = (id) => Contact.findOne({ _id: id });

const createContact = ({ name, email, phone }) =>
  Contact.create({ name, email, phone, favorite: false });

  const updateContact=(id,contact)=>Contact.findByIdAndUpdate(id,contact)

  const removeContact=(id)=>Contact.findByIdAndRemove({_id:id})

  module.exports={
    getAllContacts,getContactById,createContact,updateContact,removeContact
  }