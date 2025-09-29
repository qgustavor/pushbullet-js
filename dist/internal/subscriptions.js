import PushBullet from '../pushbullet';
PushBullet.prototype.subscriptions = function subscriptions(options = {}) {
    if (options.active === undefined) {
        options.active = true;
    }
    return this.getList(PushBullet.SUBS_END_POINT, options);
};
PushBullet.prototype.subscribe = function subscribe(channelTag) {
    const options = {
        json: {
            channel_tag: channelTag
        }
    };
    return this.makeRequest('post', PushBullet.SUBS_END_POINT, options);
};
PushBullet.prototype.unsubscribe = function unsubscribe(subscriptionIden) {
    return this.makeRequest('delete', PushBullet.SUBS_END_POINT + '/' + subscriptionIden, null);
};
PushBullet.prototype.muteSubscription = function muteSubscription(subscriptionIden) {
    return this.updateSubscription(subscriptionIden, { muted: true });
};
PushBullet.prototype.unmuteSubscription = function unmuteSubscription(subscriptionIden) {
    return this.updateSubscription(subscriptionIden, { muted: false });
};
PushBullet.prototype.updateSubscription = function updateSubscription(subscriptionIden, updates) {
    const options = {
        json: updates
    };
    return this.makeRequest('post', PushBullet.SUBS_END_POINT + '/' + subscriptionIden, options);
};
//# sourceMappingURL=subscriptions.js.map