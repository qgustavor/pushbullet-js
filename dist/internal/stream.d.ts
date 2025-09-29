import { EventEmitter } from 'node:events';
import type Encryption from './encryption';
/**
 * Event emitter for the Pushbullet streaming API.
 */
export default class Stream extends EventEmitter {
    private apiKey;
    private encryption?;
    private client?;
    private pingTimeout?;
    constructor(apiKey: string, encryption?: Encryption);
    connect(): void;
    close(): void;
    private heartbeat;
}
//# sourceMappingURL=stream.d.ts.map