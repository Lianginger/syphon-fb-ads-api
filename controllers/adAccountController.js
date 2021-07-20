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
    const timeRangeSince = req.query.timeRangeSince
      ? req.query.timeRangeSince
      : null
    const timeRangeUntil = req.query.timeRangeUntil
      ? req.query.timeRangeUntil
      : null

    let fields = [
      'cpc',
      'spend',
      'purchase_roas',
      'campaign_name',
      'action_values',
      'actions',
      'cost_per_action_type',
    ]
    let params = {
      time_increment: 1,
      date_preset: 'maximum',
      before: cursorBefore,
      after: cursorAfter,
      level: 'campaign',
      sort: 'date_start_descending',
      limit: 1000,
    }
    if (timeRangeSince && timeRangeUntil) {
      params = {
        ...params,
        time_range: {
          since: timeRangeSince,
          until: timeRangeUntil,
        },
      }
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
  getAdAccountInfo: (req, res) => {
    const adAccountId = req.params.adAccountId
    const account = new AdAccount(adAccountId)

    let fields = ['name', 'business_street', 'business_street2']
    let params = {}

    account
      .get(fields, params)
      .then((response) => {
        console.log(response)
        const data = response._data

        res.json(data)
      })
      .catch((error) => {
        res.json(error)
      })
  },
}

module.exports = adAccountController
