import PushBullet from '../pushbullet'
import type { ListOptions } from '../types'

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

PushBullet.prototype.subscriptions = function subscriptions (options: ListOptions = {}): Promise<Response> {
  if (options.active === undefined) {
    options.active = true
  }

  return this.getList(PushBullet.SUBS_END_POINT, options)
}

PushBullet.prototype.subscribe = function subscribe (channelTag: string): Promise<Response> {
  const options = {
    json: {
      channel_tag: channelTag
    }
  }

  return this.makeRequest('post', PushBullet.SUBS_END_POINT, options)
}

PushBullet.prototype.unsubscribe = function unsubscribe (subscriptionIden: string): Promise<Response> {
  return this.makeRequest(
    'delete',
    PushBullet.SUBS_END_POINT + '/' + subscriptionIden,
    null
  )
}

PushBullet.prototype.muteSubscription = function muteSubscription (subscriptionIden: string): Promise<Response> {
  return this.updateSubscription(subscriptionIden, { muted: true })
}

PushBullet.prototype.unmuteSubscription = function unmuteSubscription (subscriptionIden: string): Promise<Response> {
  return this.updateSubscription(subscriptionIden, { muted: false })
}

PushBullet.prototype.updateSubscription = function updateSubscription (subscriptionIden: string, updates: Record<string, any>): Promise<Response> {
  const options = {
    json: updates
  }

  return this.makeRequest(
    'post',
    PushBullet.SUBS_END_POINT + '/' + subscriptionIden,
    options
  )
}
