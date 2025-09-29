import PushBullet from '../pushbullet';
PushBullet.prototype.createText = function createText(deviceIden, addresses, message, textOptions = {}) {
    const options = {
        data: {
            target_device_iden: deviceIden,
            addresses: Array.isArray(addresses) ? addresses : [addresses],
            message
        }
    };
    if (textOptions.guid) {
        options.data.guid = textOptions.guid;
    }
    if (textOptions.status) {
        options.data.status = textOptions.status;
    }
    if (textOptions.file_type) {
        options.data.file_type = textOptions.file_type;
    }
    if (textOptions.file_url) {
        options.file_url = textOptions.file_url;
    }
    if (textOptions.skip_file_delete) {
        options.skip_file_delete = textOptions.skip_file_delete;
    }
    return this.makeRequest('post', PushBullet.TEXTS_END_POINT, { json: options });
};
PushBullet.prototype.updateText = function updateText(textIden, textOptions) {
    return this.makeRequest('post', PushBullet.TEXTS_END_POINT + '/' + textIden, {
        json: textOptions
    });
};
PushBullet.prototype.deleteText = function deleteText(textIden) {
    return this.makeRequest('delete', PushBullet.TEXTS_END_POINT + '/' + textIden, {});
};
//# sourceMappingURL=texts.js.map