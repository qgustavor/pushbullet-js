import PushBullet from '../pushbullet';
PushBullet.prototype.devices = function devices(options = {}) {
    if (options.active === undefined) {
        options.active = true;
    }
    return this.getList(PushBullet.DEVICES_END_POINT, options);
};
PushBullet.prototype.createDevice = function createDevice(deviceOptions) {
    const options = {
        json: deviceOptions
    };
    return this.makeRequest('post', PushBullet.DEVICES_END_POINT, options);
};
PushBullet.prototype.updateDevice = function updateDevice(deviceIden, deviceOptions) {
    const options = {
        json: deviceOptions
    };
    return this.makeRequest('post', PushBullet.DEVICES_END_POINT + '/' + deviceIden, options);
};
PushBullet.prototype.deleteDevice = function deleteDevice(deviceIden) {
    return this.makeRequest('delete', PushBullet.DEVICES_END_POINT + '/' + deviceIden, {});
};
//# sourceMappingURL=devices.js.map