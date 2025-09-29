import PushBullet from '../pushbullet'
import type { ChannelOptions } from '../types'

declare module '../pushbullet' {
  interface PushBullet {
    createChannel(channelOptions: ChannelOptions): Promise<Response>;
    channelInfo(channelTag: string): Promise<Response>;
  }
}

PushBullet.prototype.createChannel = function createChannel (channelOptions: ChannelOptions): Promise<Response> {
  return this.makeRequest('post', PushBullet.CHANNELS_END_POINT, {
    json: channelOptions
  })
}

PushBullet.prototype.channelInfo = function channelInfo (channelTag: string): Promise<Response> {
  const options = {
    qs: {
      tag: channelTag
    }
  }

  return this.makeRequest('get', PushBullet.CHANNEL_INFO_END_POINT, options)
}
