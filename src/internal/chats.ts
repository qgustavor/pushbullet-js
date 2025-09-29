import PushBullet from '../pushbullet'
import type { ListOptions } from '../types'

declare module '../pushbullet' {
  interface PushBullet {
    chats(options?: ListOptions): Promise<Response>;
    createChat(email: string): Promise<Response>;
    muteChat(chatIden: string): Promise<Response>;
    unmuteChat(chatIden: string): Promise<Response>;
    updateChat(chatIden: string, updates: Record<string, any>): Promise<Response>;
    deleteChat(chatIden: string): Promise<Response>;
  }
}

PushBullet.prototype.chats = function chats (options: ListOptions = {}): Promise<Response> {
  if (options.active === undefined) {
    options.active = true
  }

  return this.getList(PushBullet.CHATS_END_POINT, options)
}

PushBullet.prototype.createChat = function createChat (email: string): Promise<Response> {
  const options = {
    json: {
      email
    }
  }

  return this.makeRequest('post', PushBullet.CHATS_END_POINT, options)
}

PushBullet.prototype.muteChat = function muteChat (chatIden: string): Promise<Response> {
  return this.updateChat(chatIden, { muted: true })
}

PushBullet.prototype.unmuteChat = function unmuteChat (chatIden: string): Promise<Response> {
  return this.updateChat(chatIden, { muted: false })
}

PushBullet.prototype.updateChat = function updateChat (chatIden: string, updates: Record<string, any>): Promise<Response> {
  const options = {
    json: updates
  }

  return this.makeRequest('post', PushBullet.CHATS_END_POINT + '/' + chatIden, options)
}

PushBullet.prototype.deleteChat = function deleteChat (chatIden: string): Promise<Response> {
  return this.makeRequest('delete', PushBullet.CHATS_END_POINT + '/' + chatIden, null)
}
