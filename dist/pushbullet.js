import Encryption from './internal/encryption';
import Stream from './internal/stream';
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
class PushBullet {
    static API_BASE = 'https://api.pushbullet.com/v2';
    static CHANNEL_INFO_END_POINT = PushBullet.API_BASE + '/channel-info';
    static CHANNELS_END_POINT = PushBullet.API_BASE + '/channels';
    static CHATS_END_POINT = PushBullet.API_BASE + '/chats';
    static DEVICES_END_POINT = PushBullet.API_BASE + '/devices';
    static EPHEMERALS_END_POINT = PushBullet.API_BASE + '/ephemerals';
    static PUSH_END_POINT = PushBullet.API_BASE + '/pushes';
    static SUBS_END_POINT = PushBullet.API_BASE + '/subscriptions';
    static TEXTS_END_POINT = PushBullet.API_BASE + '/texts';
    static UPLOAD_END_POINT = PushBullet.API_BASE + '/upload-request';
    static USERS_END_POINT = PushBullet.API_BASE + '/users';
    apiKey;
    encryption;
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('API Key is required');
        }
        this.apiKey = apiKey;
    }
    /**
     * Enables End-to-End encryption.
     */
    async enableEncryption(encryptionPassword, userIden) {
        this.encryption = new Encryption();
        return this.encryption.init(encryptionPassword, userIden);
    }
    /**
     * Return a new stream listener.
     */
    stream() {
        return new Stream(this.apiKey, this.encryption);
    }
    /**
     * Performs a GET request to an end point.
     */
    getList(endPoint, options = {}) {
        const parameters = {};
        const optionKeys = Object.keys(options);
        if (optionKeys.length > 0) {
            parameters.qs = {};
            optionKeys.forEach((key) => {
                parameters.qs[key] = options[key];
            });
        }
        return this.makeRequest('get', endPoint, parameters);
    }
    /**
     * Makes the request to the PushBullet API.
     */
    makeRequest(verb, endPoint, options) {
        const fetchInit = {
            method: verb,
            headers: {
                'Access-Token': this.apiKey
            }
        };
        if (options?.qs) {
            const url = new URL(endPoint);
            for (const key of Object.keys(options.qs)) {
                url.searchParams.append(key, options.qs[key]);
            }
            endPoint = url.toString();
        }
        if (options?.json) {
            fetchInit.body = JSON.stringify(options.json);
            fetchInit.headers['Content-Type'] = 'application/json';
        }
        return fetch(endPoint, fetchInit);
    }
}
export default PushBullet;
export { PushBullet };
//# sourceMappingURL=pushbullet.js.map