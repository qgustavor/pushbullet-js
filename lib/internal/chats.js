import PushBullet from '../pushbullet.js'

/**
 * Get a list of current chats.
 *
 * @param   {Object}  options Optional options object.
 * @returns {Promise}
 */
PushBullet.prototype.chats = function chats (options = {}) {
  if (options.active === undefined) {
    options.active = true
  }

  return this.getList(PushBullet.CHATS_END_POINT, options)
}

/**
 * Create a new chat.
 *
 * @param   {String}  channelTag Email of the person to create the chat with.
 * @returns {Promise}
 */
PushBullet.prototype.createChat = function createChat (email) {
  const options = {
    json: {
      email
    }
  }

  return this.makeRequest('post', PushBullet.CHATS_END_POINT, options)
}

/**
 * Mute a chat.
 *
 * @param   {String}  chatIden The iden of the chat to mute.
 * @returns {Promise}
 */
PushBullet.prototype.muteChat = function muteChat (chatIden) {
  return this.updateChat(chatIden, { muted: true })
}

/**
 * Unmute chat.
 *
 * @param   {String}  chatIden The iden of the chat to unmute.
 * @returns {Promise}
 */
PushBullet.prototype.unmuteChat = function unmuteChat (chatIden) {
  return this.updateChat(chatIden, { muted: false })
}

/**
 * Update a chat.
 *
 * @param   {String}  chatIden The iden of the chat to ubsubscribe from.
 * @param   {Object}  updates  Updates to make to chat.
 * @returns {Promise}
 */
PushBullet.prototype.updateChat = function updateChat (chatIden, updates) {
  const options = {
    json: updates
  }

  return this.makeRequest('post', PushBullet.CHATS_END_POINT + '/' + chatIden, options)
}

/**
 * Delete a chat.
 *
 * @param   {String}  chatIden The iden of the chat to delete.
 * @returns {Promise}
 */
PushBullet.prototype.deleteChat = function deleteChat (chatIden) {
  return this.makeRequest('delete', PushBullet.CHATS_END_POINT + '/' + chatIden, null)
}
