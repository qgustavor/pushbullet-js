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
    init(encryptionPassword: string, userIden: string): Promise<void>;
    encryptionKey: CryptoKey;
    /**
     * Encrypts a message.
     *
     * @param   {String} message A message to encrypt.
     * @returns {String}         Encrypted message
     */
    encrypt(message: string): string;
    /**
     * Decrypts a message.
     *
     * @param  {String} message A message to decrypt.
     * @return {String}         Decrypted message.
     */
    decrypt(message: string): string;
}
