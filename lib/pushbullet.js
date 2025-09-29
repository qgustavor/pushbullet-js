import Encryption from './internal/encryption.js'
import Stream from './internal/stream.js'

import './internal/channels.js'
import './internal/chats.js'
import './internal/devices.js'
import './internal/ephemerals.js'
import './internal/pushes.js'
import './internal/subscriptions.js'
import './internal/texts.js'
import './internal/users.js'

/**
 * PushBullet API abstraction module.
 *
 * @param {String} apiKey PushBullet API key.
 */
function PushBullet (apiKey) {
  if (!apiKey) {
    throw new Error('API Key is required')
  }

  this.apiKey = apiKey
}
export default PushBullet
export { PushBullet }

PushBullet.API_BASE = 'https://api.pushbullet.com/v2'
PushBullet.CHANNEL_INFO_END_POINT = PushBullet.API_BASE + '/channel-info'
PushBullet.CHANNELS_END_POINT = PushBullet.API_BASE + '/channels'
PushBullet.CHATS_END_POINT = PushBullet.API_BASE + '/chats'
PushBullet.DEVICES_END_POINT = PushBullet.API_BASE + '/devices'
PushBullet.EPHEMERALS_END_POINT = PushBullet.API_BASE + '/ephemerals'
PushBullet.PUSH_END_POINT = PushBullet.API_BASE + '/pushes'
PushBullet.SUBS_END_POINT = PushBullet.API_BASE + '/subscriptions'
PushBullet.TEXTS_END_POINT = PushBullet.API_BASE + '/texts'
PushBullet.UPLOAD_END_POINT = PushBullet.API_BASE + '/upload-request'
PushBullet.USERS_END_POINT = PushBullet.API_BASE + '/users'

/**
 * Enables End-to-End encryption.
 *
 * @param {String} encryptionPassword End-to-End encryption password set by the user.
 * @param {String} userIden           The iden of the user (aquired e.g. by the /me request).
 * @returns {Promise}
 */
PushBullet.prototype.enableEncryption = function enableEncryption (encryptionPassword, userIden) {
  this.encryption = new Encryption()
  return this.encryption.init(encryptionPassword, userIden)
}

/**
 * Return a new stream listener.
 *
 * @return {Stream} Stream listener.
 */
PushBullet.prototype.stream = function stream () {
  return new Stream(this.apiKey, this.encryption)
}

/**
 * Performs a GET request to an end point.
 *
 * Options passed are added to the end point as a query string.
 *
 * @param   {String}  endPoint URL to send GET request to.
 * @param   {Object}  options  Key/value options used as query string parameters.
 * @returns {Promise}
 */
PushBullet.prototype.getList = function getList (endPoint, options = {}) {
  const parameters = {}
  const optionKeys = Object.keys(options)

  if (optionKeys.length > 0) {
    parameters.qs = {}

    optionKeys.forEach(function (key) {
      parameters.qs[key] = options[key]
    })
  }

  return this.makeRequest('get', endPoint, parameters)
}

/**
 * Makes the request to the PushBullet API.
 *
 * @param   {String}  verb     The http verb that is being made
 * @param   {String}  endPoint The api endpoint
 * @param   {Object}  options  The options to be sent with the request
 * @returns {Promise}
 */
PushBullet.prototype.makeRequest = function makeRequest (verb, endPoint, options) {
  const fetchInit = {
    method: verb,
    headers: {
      'Access-Token': this.apiKey
    }
  }

  if (options && options.qs) {
    const url = new URL(endPoint)
    for (const key of Object.keys(options.qs)) {
      url.searchParams.append(key, options.qs[key])
    }
    endPoint = url.toString()
  }

  if (options && options.json) {
    fetchInit.body = JSON.stringify(options.json)
    fetchInit.headers['Content-Type'] = 'application/json'
  }

  return fetch(endPoint, fetchInit)
}
