// import express
const express = require('express')
// set express
const app = express()
// set service port
const PORT = process.env.PORT || 3000
// import express-handlebars
const exphbs = require('express-handlebars')
// import routes
const routes = require('./routes')
// set mongoose path
require('./config/mongoose')

// set template
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
// use template
app.set('view engine', 'hbs')
// use body-parser for parsing url request
app.use(express.urlencoded({ extended: true }))
// use route
app.use(routes)

//start service
app.listen(PORT, () => {
  return console.log(`App is running on http://localhost:${PORT}`)
})