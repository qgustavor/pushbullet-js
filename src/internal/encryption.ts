/**
 * Encryption module for the PushBullet API.
 */
export default class Encryption {
  private encryptionKey?: CryptoKey

  async init (encryptionPassword: string, userIden: string): Promise<void> {
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

  async encrypt (message: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized')
    }

    const key = this.encryptionKey

    const initializationVector = globalThis.crypto.getRandomValues(
      new Uint8Array(12)
    )
    const cipher = await globalThis.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: initializationVector },
      key,
      new TextEncoder().encode(message)
    )

    const encryptedMessage = cipher.slice(0, cipher.byteLength - 16)
    const tag = cipher.slice(cipher.byteLength - 16)

    const result = Buffer.from('1' + String.fromCharCode(...new Uint8Array(tag)) + String.fromCharCode(...initializationVector) + String.fromCharCode(...new Uint8Array(encryptedMessage))).toString('base64')

    return result
  }

  async decrypt (message: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized')
    }

    const binaryMessage = Buffer.from(message, 'base64')
    const key = this.encryptionKey
    const version = binaryMessage[0]
    const tag = binaryMessage.slice(1, 17)
    const initializationVector = binaryMessage.slice(17, 29)
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

    const result = new TextDecoder().decode(decrypted)
    return result
  }
}
