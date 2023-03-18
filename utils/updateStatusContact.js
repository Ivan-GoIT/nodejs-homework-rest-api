const Contact = require("../service/schemas/contact")

exports.updateStatusContact=async(contactId,body)=>Contact .findByIdAndUpdate(contactId,{favorite:body},{new:true}) 

