// import express
const express = require('express')
// use express router
const router = express.Router()
// import url path
const URL = require('../../models/url')
// generate random url
const generateRandomCode = require('../../tools/generateRandomCode')
// get home page
router.get('/', (req, res) => {
  res.render('index')
})
//
router.post('/shortened', (req, res) => {
  const { inputURL } = req.body
  let hosturl = req.headers.host
  let randomCode = ''

  URL.find() // find url from db
    .lean()
    .then(urls => {
      // check url in db is equal to input url then give it to targetUrl
      targetUrl = urls.filter(eachUrl => eachUrl.inputURL === inputURL)
      // if it finds targetUrl, then get that randomCode
      if (targetUrl.length === 1) {
        randomCode = targetUrl[0].randomCode
      } else { //if it's not find, then call generateRandomCode func and give value to randomCode
        randomCode = generateRandomCode()
        // check if the randomCode exists in db 
        while(urls.some(eachUrl => eachUrl.randomCode === randomCode)) {
          randomCode = generateRandomCode()
        }
        // return inputURL and randomCode to url db
        return URL.create({inputURL, randomCode})
      }
    })
    .then(() => { // check both of connections then create different short url format
      if(hosturl === 'localhost:3000') {
        shortURL = `http://${hosturl}/${randomCode}`
      } else {
        shortURL = `https://${hosturl}/${randomCode}`
      }
      res.render('index', { inputURL, shortURL })
    })
    .catch(error => console.log(error))
})

router.get('/:randomCode', (req, res) => {
  const randomCode = req.params.randomCode
  // use randomCode in db to find inputURL randomCode
  URL.find({ randomCode: randomCode })
    .lean()
    .then(shortURL => {
      // if didn't find in db then redirect to default page
      if (shortURL.length === 0) {
        res.redirect('/')
      } else {
        // if find out in db then redirect page
        res.redirect(shortURL[0].inputURL)
      }
    })
})

module.exports = router