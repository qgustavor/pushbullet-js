import PushBullet from '../pushbullet'
import type { TextOptions } from '../types'

declare module '../pushbullet' {
  interface PushBullet {
    createText(deviceIden: string, addresses: string | string[], message: string, textOptions?: TextOptions): Promise<Response>;
    updateText(textIden: string, textOptions: Record<string, any>): Promise<Response>;
    deleteText(textIden: string): Promise<Response>;
  }
}

PushBullet.prototype.createText = function createText (deviceIden: string, addresses: string | string[], message: string, textOptions: TextOptions = {}): Promise<Response> {
  const options: any = {
    data: {
      target_device_iden: deviceIden,
      addresses: Array.isArray(addresses) ? addresses : [addresses],
      message
    }
  }

  if (textOptions.guid) {
    options.data.guid = textOptions.guid
  }
  if (textOptions.status) {
    options.data.status = textOptions.status
  }
  if (textOptions.file_type) {
    options.data.file_type = textOptions.file_type
  }
  if (textOptions.file_url) {
    options.file_url = textOptions.file_url
  }
  if (textOptions.skip_file_delete) {
    options.skip_file_delete = textOptions.skip_file_delete
  }

  return this.makeRequest('post', PushBullet.TEXTS_END_POINT, { json: options })
}

PushBullet.prototype.updateText = function updateText (textIden: string, textOptions: Record<string, any>): Promise<Response> {
  return this.makeRequest('post', PushBullet.TEXTS_END_POINT + '/' + textIden, {
    json: textOptions
  })
}

PushBullet.prototype.deleteText = function deleteText (textIden: string): Promise<Response> {
  return this.makeRequest(
    'delete',
    PushBullet.TEXTS_END_POINT + '/' + textIden,
    {}
  )
}
