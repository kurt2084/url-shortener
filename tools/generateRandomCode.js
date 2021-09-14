// define random number scope
function sample(data) {
  const index = Math.floor(Math.random() * data.length)
  return data[index]
}
// generate random short-url
function generateRandomCode() {
  const numbers = "0123456789"
  const lowercases = "abcdefghijklmnopqrstuvwxyz"
  const uppercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const combine = numbers + lowercases + uppercases

  let randomCode = ""
  for (let i = 0; i < 5; i++ ){
    randomCode += sample(combine)
  }
  return randomCode
}
//export module as generateRandomCode
module.exports = generateRandomCode