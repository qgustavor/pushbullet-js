import type { DeviceParams, PushOptions } from '../types';
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
//# sourceMappingURL=pushes.d.ts.map