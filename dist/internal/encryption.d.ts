/**
 * Encryption module for the PushBullet API.
 */
export default class Encryption {
    private encryptionKey?;
    init(encryptionPassword: string, userIden: string): Promise<void>;
    encrypt(message: string): Promise<string>;
    decrypt(message: string): Promise<string>;
}
//# sourceMappingURL=encryption.d.ts.map