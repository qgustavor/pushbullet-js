import PushBullet from '../pushbullet';
PushBullet.prototype.sendClipboard = function sendClipboard(clipOptions) {
    const options = JSON.parse(JSON.stringify(clipOptions));
    options.type = 'clip';
    return this.sendEphemeral(options);
};
PushBullet.prototype.dismissEphemeral = function dismissEphemeral(ephemeralOptions) {
    const options = JSON.parse(JSON.stringify(ephemeralOptions));
    options.type = 'dismissal';
    return this.sendEphemeral(options);
};
PushBullet.prototype.sendEphemeral = async function sendEphemeral(ephemeralOptions) {
    let optionsToSend = ephemeralOptions;
    if (this.encryption) {
        const encryptedOptions = await this.encryption.encrypt(JSON.stringify(ephemeralOptions));
        optionsToSend = {
            ciphertext: encryptedOptions,
            encrypted: true
        };
    }
    const options = {
        json: {
            type: 'push',
            push: optionsToSend
        }
    };
    return this.makeRequest('post', PushBullet.EPHEMERALS_END_POINT, options);
};
//# sourceMappingURL=ephemerals.js.map