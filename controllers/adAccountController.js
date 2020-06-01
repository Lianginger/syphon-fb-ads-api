const bizSdk = require('facebook-nodejs-business-sdk')
const AdAccount = bizSdk.AdAccount
const access_token = process.env.ACCESS_TOKEN
const api = bizSdk.FacebookAdsApi.init(access_token)
const showDebuggingInfo = true // Setting this to true shows more debugging info.
if (showDebuggingInfo) {
  api.setDebug(true)
}

const adAccountController = {
  getAdAccountInsights: (req, res) => {
    const adAccountId = req.params.adAccountId
    const account = new AdAccount(adAccountId)
    const cursorBefore = req.query.before ? req.query.before : ''
    const cursorAfter = req.query.after ? req.query.after : ''

    let fields = [
      'cpc',
      'spend',
      'purchase_roas',
      'account_name',
      'campaign_name',
      'action_values',
      'actions',
      'cost_per_action_type',
    ]
    let params = {
      time_increment: 1,
      date_preset: 'lifetime',
      before: cursorBefore,
      after: cursorAfter,
      level: 'campaign',
      sort: 'date_start_descending',
      limit: 1000,
    }

    account
      .getInsights(fields, params, true)
      .then((response) => {
        const data = response.map((item) => item._data)
        const cursors = response.paging.cursors
        const hasPrevious = response.paging.previous ? true : false
        const hasNext = response.paging.next ? true : false

        res.json({
          data,
          paging: { cursors, hasPrevious, hasNext },
        })
      })
      .catch((error) => {
        res.json(error)
      })
  },
}

module.exports = adAccountController
