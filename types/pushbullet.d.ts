export default PushBullet;
/**
 * PushBullet API abstraction module.
 *
 * @param {String} apiKey PushBullet API key.
 */
export function PushBullet(apiKey: string): void;
export class PushBullet {
    /**
     * PushBullet API abstraction module.
     *
     * @param {String} apiKey PushBullet API key.
     */
    constructor(apiKey: string);
    apiKey: string;
    /**
     * Enables End-to-End encryption.
     *
     * @param {String} encryptionPassword End-to-End encryption password set by the user.
     * @param {String} userIden           The iden of the user (aquired e.g. by the /me request).
     * @returns {Promise}
     */
    enableEncryption(encryptionPassword: string, userIden: string): Promise<any>;
    encryption: Encryption;
    /**
     * Return a new stream listener.
     *
     * @return {Stream} Stream listener.
     */
    stream(): Stream;
    /**
     * Performs a GET request to an end point.
     *
     * Options passed are added to the end point as a query string.
     *
     * @param   {String}  endPoint URL to send GET request to.
     * @param   {Object}  options  Key/value options used as query string parameters.
     * @returns {Promise}
     */
    getList(endPoint: string, options?: any): Promise<any>;
    /**
     * Makes the request to the PushBullet API.
     *
     * @param   {String}  verb     The http verb that is being made
     * @param   {String}  endPoint The api endpoint
     * @param   {Object}  options  The options to be sent with the request
     * @returns {Promise}
     */
    makeRequest(verb: string, endPoint: string, options: any): Promise<any>;
}
export namespace PushBullet {
    let API_BASE: string;
    let CHANNEL_INFO_END_POINT: string;
    let CHANNELS_END_POINT: string;
    let CHATS_END_POINT: string;
    let DEVICES_END_POINT: string;
    let EPHEMERALS_END_POINT: string;
    let PUSH_END_POINT: string;
    let SUBS_END_POINT: string;
    let TEXTS_END_POINT: string;
    let UPLOAD_END_POINT: string;
    let USERS_END_POINT: string;
}
import Encryption from './internal/encryption.js';
import Stream from './internal/stream.js';
