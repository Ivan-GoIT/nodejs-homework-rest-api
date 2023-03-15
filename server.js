const app = require('./app');
require('dotenv').config({path:'./.env'})
const mongoose=require('mongoose')

const port = process.env.PORT||3010

mongoose.connect(process.env.DB_PATH).then((con)=>{console.log('DB connected successfully')})

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`)
})
