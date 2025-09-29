import PushBullet from '../pushbullet'

declare module '../pushbullet' {
  interface PushBullet {
    me(): Promise<Response>;
  }
}

PushBullet.prototype.me = function me (): Promise<Response> {
  return this.makeRequest('get', PushBullet.USERS_END_POINT + '/me', null)
}
