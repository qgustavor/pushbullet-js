import PushBullet from '../pushbullet';
PushBullet.prototype.me = function me() {
    return this.makeRequest('get', PushBullet.USERS_END_POINT + '/me', null);
};
//# sourceMappingURL=users.js.map