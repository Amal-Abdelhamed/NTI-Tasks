const app = require('./app/src')
require('dotenv').config()


app.listen(
    process.env.PORT,
    () => console.log(`on host http://localhost:${process.env.PORT}`)
)