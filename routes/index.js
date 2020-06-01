const main = require('./main.js')
const adAccount = require('./adAccount.js')

module.exports = app => {
  app.use('/', main)
  app.use('/ad-account',adAccount)
}