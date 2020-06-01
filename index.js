/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bizSdk = require('facebook-nodejs-business-sdk')
const AdAccount = bizSdk.AdAccount
const Campaign = bizSdk.Campaign
const AdsInsights = bizSdk.AdsInsights
const Business = bizSdk.Business
const User = bizSdk.User

let access_token = process.env.ACCESS_TOKEN

let app_secret = '5dc4f5c54bb279bf8c384be487e7f4d9'
let app_id = '2772453809519165'
const api = bizSdk.FacebookAdsApi.init(access_token)
const showDebugingInfo = true // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true)
}

let ad_account_id = 'act_2286513234710022'
const account = new AdAccount(ad_account_id)
// let fields = ['name']
// let params = {}
// account
//   .get(fields, params)
//   .then((res) => console.log(JSON.stringify(res, null, 2)))

let fields = ['cpc', 'spend', 'purchase_roas']
let params = {
  time_increment: 1,
  date_preset: 'lifetime',
}
account.getInsights(fields, params, true).then((res) => {
  const data = res.map((item) => item._data)
  const paging = res.paging
  console.log(JSON.stringify(data, null, 2))
  console.log(paging)
})

// const user = new User('me')
// user
//   .getAdAccounts([AdAccount.Fields.name, AdAccount.Fields.amount_spent])
//   .then((res) => {
//     const adAccounts = res
//     console.log(JSON.stringify(adAccounts, null, 2))
//     adAccounts.forEach((account) => console.log(JSON.stringify(account._data)))
//   })
//   .catch(console.error)

// let ads_insights
// let ads_insights_id

// const logApiCallResult = (apiCallName, data) => {
//   console.log(apiCallName)
//   if (showDebugingInfo) {
//     console.log('Data:' + JSON.stringify(data))
//   }
// }

// const fields = [
// 'actions:link_click',
// 'website_ctr:link_click',
// 'cost_per_action_type:link_click',
// ]
// const params = {
//   level: 'campaign',
//   filtering: [
// {
//   field: 'delivery_info',
//   operator: 'IN',
//   value: [
//     'active',
//     'pending_review',
//     'scheduled',
//     'recently_rejected',
//     'rejected',
//     'inactive',
//     'not_delivering',
//     'not_published',
//     'rejected',
//     'completed',
//     'recently_completed',
//     'archived',
//     'permanently_deleted',
//   ],
// },
//   ],
//   breakdowns: [],
//   time_range: { since: '2018-03-23', until: '2019-04-22' },
// }

// new AdAccount(ad_account_id)
//   .getInsights(fields, params)
//   .then((result) => {
//     logApiCallResult('ads_insights api call complete.', result)
//     ads_insights_id = result[0].id
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// account
//   .read([AdAccount.Fields.name, AdAccount.Fields.age])
//   .then((account) => {
//     console.log(account.account_id)
//   })
//   .catch((error) => {})

// var campaigns
// account
//   .read([AdAccount.Fields.name])
//   .then((account) => {
//     console.log(666, JSON.stringify(AdAccount))
//     return account.getCampaigns([Campaign.Fields.name], { limit: 10 }) // fields array and params
//   })
//   .then((result) => {
//     campaigns = result
//     campaigns.forEach((campaign) => console.log(campaign.name))
//   })
//   .catch(console.error)
