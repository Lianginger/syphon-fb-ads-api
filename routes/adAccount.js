const express = require('express')
const router = express.Router()
const adAccountController = require('../controllers/adAccountController')

router.get('/insights/:adAccountId', adAccountController.getAdAccountInsights)
router.get('/info/:adAccountId', adAccountController.getAdAccountInfo)

module.exports = router
