const microCors = require('micro-cors')
const {send} = require('micro')
const calculation = require('./calculation')

const run = (req, res) => {
  res = calculation()
  const message = `Ice Dukes: Wahrscheinlichkeit Verbleib ZEP A 2017/2018: ${Math.floor(100/res.total*res.stay)} `
  console.log(message)
  return send(res, 200, message)
}

const cors = microCors({allowMethods: ['GET']})
module.exports = cors(run)
