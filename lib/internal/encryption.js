/**
 * Encryption module for the PushBullet API.
 *
 * The encryption key is created from a user-supplied password and passed through PBKDF2.
 */
export default class Encryption {
  /**
   * @param {String} encryptionPassword End-to-End encryption password set by the user.
   * @param {String} userIden           The iden of the user (aquired e.g. by the /me request).
   */
  async init (encryptionPassword, userIden) {
    const textEncoder = new TextEncoder()
    const keyMaterial = await globalThis.crypto.subtle.importKey(
      'raw',
      textEncoder.encode(encryptionPassword),
      {
        name: 'PBKDF2'
      },
      false,
      ['deriveKey', 'deriveBits']
    )
    const encryptionKey = await globalThis.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: textEncoder.encode(userIden),
        iterations: 30000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )

    this.encryptionKey = encryptionKey
  }

  /**
   * Encrypts a message.
   *
   * @param   {String} message A message to encrypt.
   * @returns {String}         Encrypted message
   */
  async encrypt (message) {
    const key = this.encryptionKey

    const initializationVector = await globalThis.crypto.getRandomValues(
      new Uint8Array(12)
    )
    const cipher = await globalThis.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: initializationVector },
      key,
      new TextEncoder().encode(message)
    )

    const encryptedMessage = cipher.slice(0, cipher.length - 16)
    const tag = cipher.slice(cipher.length - 16)

    const result = Buffer.from('1' + tag + initializationVector + encryptedMessage).toString('base64')

    return result
  }

  /**
   * Decrypts a message.
   *
   * @param  {String} message A message to decrypt.
   * @return {String}         Decrypted message.
   */
  async decrypt (message) {
    const binaryMessage = Buffer.from(message, 'base64')
    const key = this.encryptionKey
    const version = binaryMessage[0]
    const tag = binaryMessage.slice(1, 16)
    const initializationVector = binaryMessage.slice(17, 12)
    const encryptedMessage = binaryMessage.slice(29)
    const mergedTagCipher = new Uint8Array(encryptedMessage.length + 16)
    mergedTagCipher.set(encryptedMessage, 0)
    mergedTagCipher.set(tag, encryptedMessage.length)

    // 49 => '1'
    if (version !== 49) {
      throw new Error('Invalid cipher version')
    }

    const decrypted = await globalThis.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: initializationVector, tagLength: 128 },
      key,
      mergedTagCipher
    )

    const result = new TextEncoder().encode(decrypted)
    return result
  }
}
