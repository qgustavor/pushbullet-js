import PushBullet from '../pushbullet.js'

/**
 * Send clipboard content.
 *
 * The options require body, source_user_iden and source_device_iden.
 * See https://docs.pushbullet.com/#universal-copypaste for details.
 *
 * @param   {Object}  clipOptions Clipboard options.
 * @returns {Promise}
 */
PushBullet.prototype.sendClipboard = function sendClipboard (clipOptions) {
  const options = JSON.parse(JSON.stringify(clipOptions))
  options.type = 'clip'

  return this.sendEphemeral(options)
}

/**
 * Dismiss an ephemeral.
 *
 * The options require package_name, notification_id, notification_tag and source_user_iden.
 * See https://docs.pushbullet.com/#dismissal-ephemeral for details.
 *
 * @param   {Object}  ephemeralOptions Ephemeral dismissal options.
 * @returns {Promise}
 */
PushBullet.prototype.dismissEphemeral = function dismissEphemeral (ephemeralOptions) {
  const options = JSON.parse(JSON.stringify(ephemeralOptions))
  options.type = 'dismissal'

  return this.sendEphemeral(options)
}

/**
 * Send an ephemeral.
 *
 * @param   {Object}  ephemeralOptions  Ephemeral options.
 * @returns {Promise}
 */
PushBullet.prototype.sendEphemeral = async function sendEphemeral (ephemeralOptions) {
  if (this.encryption) {
    const encryptedOptions = await this.encryption.encrypt(
      JSON.stringify(ephemeralOptions)
    )
    ephemeralOptions = {
      ciphertext: encryptedOptions,
      encrypted: true
    }
  }

  const options = {
    json: {
      type: 'push',
      push: ephemeralOptions
    }
  }

  return this.makeRequest('post', PushBullet.EPHEMERALS_END_POINT, options)
}
