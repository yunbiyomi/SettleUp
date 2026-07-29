export interface ExpenseInfo {
    id: string;
    order: number;
    emoji: string;
    place: string;
    amount: number;
    participantIds: string[];
}

export const PLACE_EMOJIS = [
    "📍",
    "🍖",
    "🍔",
    "🍗",
    "🍺",
    "🍷",
    "☕",
    "🍜",
    "🍕",
    "🍣",
    "🍰",
    "🍙",
    "🎤",
    "🍿",
    "🚕",
];
