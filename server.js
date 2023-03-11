const app = require('./app');
require('dotenv').config({path:'./.env'})

const port = process.env.PORT||3010

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`)
})
