/**
 * Event emitter for the Pushbullet streaming API.
 */
export default class Stream {
    /**
     * @param {String}     apiKey PushBullet API key.
     * @param {Encryption} encryption Encryption instance.
     */
    constructor(apiKey: string, encryption: Encryption);
    apiKey: string;
    encryption: Encryption;
    /**
     * Connect to the stream.
     */
    connect(): void;
    client: WebSocket;
    /**
     * Disconnect from the stream.
     */
    close(): void;
    /**
     * Reconnect to stream if a 'nop' message hasn't been seen for 30 seconds.
     */
    heartbeat(): void;
    pingTimeout: number;
}
