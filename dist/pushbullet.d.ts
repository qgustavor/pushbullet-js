import Encryption from './internal/encryption';
import Stream from './internal/stream';
import type { RequestOptions } from './types';
import './internal/channels';
import './internal/chats';
import './internal/devices';
import './internal/ephemerals';
import './internal/pushes';
import './internal/subscriptions';
import './internal/texts';
import './internal/users';
/**
 * PushBullet API abstraction module.
 */
declare class PushBullet {
    static readonly API_BASE = "https://api.pushbullet.com/v2";
    static readonly CHANNEL_INFO_END_POINT: string;
    static readonly CHANNELS_END_POINT: string;
    static readonly CHATS_END_POINT: string;
    static readonly DEVICES_END_POINT: string;
    static readonly EPHEMERALS_END_POINT: string;
    static readonly PUSH_END_POINT: string;
    static readonly SUBS_END_POINT: string;
    static readonly TEXTS_END_POINT: string;
    static readonly UPLOAD_END_POINT: string;
    static readonly USERS_END_POINT: string;
    apiKey: string;
    encryption?: Encryption;
    constructor(apiKey: string);
    /**
     * Enables End-to-End encryption.
     */
    enableEncryption(encryptionPassword: string, userIden: string): Promise<void>;
    /**
     * Return a new stream listener.
     */
    stream(): Stream;
    /**
     * Performs a GET request to an end point.
     */
    getList(endPoint: string, options?: Record<string, any>): Promise<Response>;
    /**
     * Makes the request to the PushBullet API.
     */
    makeRequest(verb: string, endPoint: string, options?: RequestOptions | null): Promise<Response>;
}
export default PushBullet;
export { PushBullet };
//# sourceMappingURL=pushbullet.d.ts.map