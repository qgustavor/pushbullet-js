import mime from 'mime'
import PushBullet from '../pushbullet'
import type { DeviceParams, PushOptions } from '../types'

declare module '../pushbullet' {
  interface PushBullet {
    note(deviceParams: string | number | DeviceParams, title: string, body: string): Promise<Response>;
    link(deviceParams: string | number | DeviceParams, title: string, url: string, body?: string): Promise<Response>;
    file(deviceParams: string | number | DeviceParams, file: File, body?: string): Promise<Response>;
    push(deviceParams: string | number | DeviceParams, bullet: Record<string, any>): Promise<Response>;
    history(options?: PushOptions): Promise<Response>;
    dismissPush(pushIden: string): Promise<Response>;
    updatePush(pushIden: string, updates?: Record<string, any>): Promise<Response>;
    deletePush(pushIden: string): Promise<Response>;
    deleteAllPushes(): Promise<Response>;
  }
}

PushBullet.prototype.note = function note (deviceParams: string | number | DeviceParams, title: string, body: string): Promise<Response> {
  const pushParameters = {
    type: 'note',
    title,
    body
  }

  return this.push(deviceParams, pushParameters)
}

PushBullet.prototype.link = function link (deviceParams: string | number | DeviceParams, title: string, url: string, body?: string): Promise<Response> {
  return this.push(deviceParams, {
    type: 'link',
    title,
    url,
    body
  })
}

PushBullet.prototype.file = async function file (deviceParams: string | number | DeviceParams, file: File, body?: string): Promise<Response> {
  const fileType = mime.getType(file.name)

  const uploadRequestResponse = await fetch(PushBullet.UPLOAD_END_POINT, {
    method: 'post',
    body: JSON.stringify({
      file_name: file.name,
      file_type: fileType
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': this.apiKey
    }
  })

  const uploadRequestResponseJson = await uploadRequestResponse.json()

  const formData = new FormData()
  formData.append('file', file)

  const uploadFileResponse = await fetch(uploadRequestResponseJson.upload_url, {
    method: 'post',
    body: formData
  })

  if (uploadFileResponse.status !== 204) {
    throw new Error('file upload error')
  }

  return this.push(deviceParams, {
    type: 'file',
    file_name: file.name,
    file_type: fileType,
    file_url: uploadRequestResponseJson.file_url,
    body
  })
}

PushBullet.prototype.push = function push (deviceParams: string | number | DeviceParams, bullet: Record<string, any>): Promise<Response> {
  if (typeof deviceParams === 'string') {
    if (deviceParams.indexOf('@') !== -1) {
      bullet.email = deviceParams
    } else {
      bullet.device_iden = deviceParams
    }
  } else if (typeof deviceParams === 'number') {
    bullet.device_id = deviceParams
  } else if (typeof deviceParams === 'object') {
    for (const param in deviceParams) {
      bullet[param] = deviceParams[param as keyof DeviceParams]
    }
  }

  return this.makeRequest('post', PushBullet.PUSH_END_POINT, { json: bullet })
}

PushBullet.prototype.history = function history (options: PushOptions = {}): Promise<Response> {
  if (options.active === undefined) {
    options.active = true
  }

  if (options.modified_after === undefined) {
    options.modified_after = 0
  }

  return this.getList(PushBullet.PUSH_END_POINT, options)
}

PushBullet.prototype.dismissPush = function dismissPush (pushIden: string): Promise<Response> {
  return this.updatePush(pushIden, { dismissed: true })
}

PushBullet.prototype.updatePush = function updatePush (pushIden: string, updates: Record<string, any> = {}): Promise<Response> {
  const options = {
    json: updates
  }

  return this.makeRequest(
    'post',
    PushBullet.PUSH_END_POINT + '/' + pushIden,
    options
  )
}

PushBullet.prototype.deletePush = function deletePush (pushIden: string): Promise<Response> {
  return this.makeRequest(
    'delete',
    PushBullet.PUSH_END_POINT + '/' + pushIden,
    null
  )
}

PushBullet.prototype.deleteAllPushes = function deleteAllPushes (): Promise<Response> {
  return this.makeRequest('delete', PushBullet.PUSH_END_POINT, {})
}
