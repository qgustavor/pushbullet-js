import type { ListOptions, DeviceOptions } from '../types';
declare module '../pushbullet' {
    interface PushBullet {
        devices(options?: ListOptions): Promise<Response>;
        createDevice(deviceOptions: DeviceOptions): Promise<Response>;
        updateDevice(deviceIden: string, deviceOptions: Partial<DeviceOptions>): Promise<Response>;
        deleteDevice(deviceIden: string): Promise<Response>;
    }
}
//# sourceMappingURL=devices.d.ts.map