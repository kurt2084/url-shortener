// import express
const express = require('express')
// use express router
const router = express.Router()
// define home path
const home = require('./modules/home')
// set default home page
router.use('/', home)
// export module as router
module.exports = router