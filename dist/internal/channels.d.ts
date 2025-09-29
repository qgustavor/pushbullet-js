import type { ChannelOptions } from '../types';
declare module '../pushbullet' {
    interface PushBullet {
        createChannel(channelOptions: ChannelOptions): Promise<Response>;
        channelInfo(channelTag: string): Promise<Response>;
    }
}
//# sourceMappingURL=channels.d.ts.map