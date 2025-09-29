import type { ClipboardOptions, DismissalOptions } from '../types';
declare module '../pushbullet' {
    interface PushBullet {
        sendClipboard(clipOptions: ClipboardOptions): Promise<Response>;
        dismissEphemeral(ephemeralOptions: DismissalOptions): Promise<Response>;
        sendEphemeral(ephemeralOptions: Record<string, any>): Promise<Response>;
    }
}
//# sourceMappingURL=ephemerals.d.ts.map