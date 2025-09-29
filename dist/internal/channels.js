import PushBullet from '../pushbullet';
PushBullet.prototype.createChannel = function createChannel(channelOptions) {
    return this.makeRequest('post', PushBullet.CHANNELS_END_POINT, {
        json: channelOptions
    });
};
PushBullet.prototype.channelInfo = function channelInfo(channelTag) {
    const options = {
        qs: {
            tag: channelTag
        }
    };
    return this.makeRequest('get', PushBullet.CHANNEL_INFO_END_POINT, options);
};
//# sourceMappingURL=channels.js.map