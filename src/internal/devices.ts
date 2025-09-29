import PushBullet from '../pushbullet'
import type { ListOptions, DeviceOptions } from '../types'

declare module '../pushbullet' {
  interface PushBullet {
    devices(options?: ListOptions): Promise<Response>;
    createDevice(deviceOptions: DeviceOptions): Promise<Response>;
    updateDevice(deviceIden: string, deviceOptions: Partial<DeviceOptions>): Promise<Response>;
    deleteDevice(deviceIden: string): Promise<Response>;
  }
}

PushBullet.prototype.devices = function devices (options: ListOptions = {}): Promise<Response> {
  if (options.active === undefined) {
    options.active = true
  }

  return this.getList(PushBullet.DEVICES_END_POINT, options)
}

PushBullet.prototype.createDevice = function createDevice (deviceOptions: DeviceOptions): Promise<Response> {
  const options = {
    json: deviceOptions
  }

  return this.makeRequest('post', PushBullet.DEVICES_END_POINT, options)
}

PushBullet.prototype.updateDevice = function updateDevice (deviceIden: string, deviceOptions: Partial<DeviceOptions>): Promise<Response> {
  const options = {
    json: deviceOptions
  }

  return this.makeRequest('post', PushBullet.DEVICES_END_POINT + '/' + deviceIden, options)
}

PushBullet.prototype.deleteDevice = function deleteDevice (deviceIden: string): Promise<Response> {
  return this.makeRequest('delete', PushBullet.DEVICES_END_POINT + '/' + deviceIden, {})
}
