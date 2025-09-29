import type { TextOptions } from '../types';
declare module '../pushbullet' {
    interface PushBullet {
        createText(deviceIden: string, addresses: string | string[], message: string, textOptions?: TextOptions): Promise<Response>;
        updateText(textIden: string, textOptions: Record<string, any>): Promise<Response>;
        deleteText(textIden: string): Promise<Response>;
    }
}
//# sourceMappingURL=texts.d.ts.map