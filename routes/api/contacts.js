const express = require('express')
// const { listContacts, getContactById, removeContact, addContact }=require('../helpers/helpers.js')

const router = express.Router()

router.get('/', async (req, res, next) => {

  try {
    // const data=await listContacts()
    res.json({
      status:'success',
      code:200,
      // data
    })
  } catch (error) {
    console.log(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
