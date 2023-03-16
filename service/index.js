const Contact = require("./schemas/contact");

const getAllContacts = async () => Contact.find().select('-_id -favorite');

const getContactById = async(id) => Contact.findOne({ _id: id });

const createContact = async({ name, email, phone }) =>
  Contact.create({ name, email, phone, favorite: false });

  const updateContact=async(id,contact)=>Contact.findByIdAndUpdate(id,contact)

  const removeContact=async(id)=>Contact.findByIdAndRemove({_id:id})

  module.exports={
    getAllContacts,getContactById,createContact,updateContact,removeContact
  }