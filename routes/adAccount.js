const express = require('express')
const router = express.Router()
const adAccountController = require('../controllers/adAccountController')

router.get('/:adAccountId', adAccountController.getAdAccountInsights)

module.exports = router