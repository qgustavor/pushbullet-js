import type { ListOptions } from '../types';
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
//# sourceMappingURL=chats.d.ts.map