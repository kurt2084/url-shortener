// import express
const express = require('express')
const router = require('..')
// use express router
const Router = express.Router
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

  URL.find()
    .lean()
    .then(urls => {
      targetUrl = urls.filter(eachUrl => eachUrl.inputURL === inputURL)
      if (targetUrl.length === 1) {
        randomCode = targetUrl[0].randomCode
      } else {
        randomCode = generateRandomCode()
        while(urls.some(eachUrl => eachUrl.randomCode === randomCode)) {
          randomCode = generateRandomCode()
        }
        return URL.create({inputURL, randomCode})
      }
    })
    .then(() => {
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
  URL.find({ randomCode: randomCode })
    .lean()
    .then(shortURL => {
      if (shortURL.length === 0) {
        res.redirect('/')
      } else {
        res.redirect(shortURL[0].inputURL)
      }
    })
})

module.exports = router