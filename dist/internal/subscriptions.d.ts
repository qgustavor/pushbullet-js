import type { ListOptions } from '../types';
declare module '../pushbullet' {
    interface PushBullet {
        subscriptions(options?: ListOptions): Promise<Response>;
        subscribe(channelTag: string): Promise<Response>;
        unsubscribe(subscriptionIden: string): Promise<Response>;
        muteSubscription(subscriptionIden: string): Promise<Response>;
        unmuteSubscription(subscriptionIden: string): Promise<Response>;
        updateSubscription(subscriptionIden: string, updates: Record<string, any>): Promise<Response>;
    }
}
//# sourceMappingURL=subscriptions.d.ts.map