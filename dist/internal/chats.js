import PushBullet from '../pushbullet';
PushBullet.prototype.chats = function chats(options = {}) {
    if (options.active === undefined) {
        options.active = true;
    }
    return this.getList(PushBullet.CHATS_END_POINT, options);
};
PushBullet.prototype.createChat = function createChat(email) {
    const options = {
        json: {
            email
        }
    };
    return this.makeRequest('post', PushBullet.CHATS_END_POINT, options);
};
PushBullet.prototype.muteChat = function muteChat(chatIden) {
    return this.updateChat(chatIden, { muted: true });
};
PushBullet.prototype.unmuteChat = function unmuteChat(chatIden) {
    return this.updateChat(chatIden, { muted: false });
};
PushBullet.prototype.updateChat = function updateChat(chatIden, updates) {
    const options = {
        json: updates
    };
    return this.makeRequest('post', PushBullet.CHATS_END_POINT + '/' + chatIden, options);
};
PushBullet.prototype.deleteChat = function deleteChat(chatIden) {
    return this.makeRequest('delete', PushBullet.CHATS_END_POINT + '/' + chatIden, null);
};
//# sourceMappingURL=chats.js.map