export type Chat = {
    id: string;
    title: string;
    message: string;
    time: string;
    active: boolean;
    unread?: number;
    avatar?: string;
};