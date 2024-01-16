export interface Chats {
    source: string;
    text: string;
    timestamp: number;
    stream?: boolean;
    suggestions: [string]
}