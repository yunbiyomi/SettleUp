export interface Member {
    id: string;
    name: string;
    emoji: string;
    color: string;
    lightColor: string;
}

export const MEMBER_STYLES = [
    { emoji: "🐶", color: "rgba(122,74,31,0.7)", lightColor: "#f6e0c2" },
    { emoji: "🐱", color: "rgba(91,58,138,0.7)", lightColor: "#e8dcf7" },
    { emoji: "🐭", color: "rgba(69,79,94,0.7)", lightColor: "#e1e4e9" },
    { emoji: "🐹", color: "rgba(181,84,26,0.7)", lightColor: "#fadfc4" },
    { emoji: "🐰", color: "rgba(181,71,106,0.7)", lightColor: "#fadce6" },
    { emoji: "🦊", color: "rgba(156,59,35,0.7)", lightColor: "#f9dcd0" },
    { emoji: "🐻", color: "rgba(92,58,32,0.7)", lightColor: "#ecdccb" },
    { emoji: "🐼", color: "rgba(43,43,43,0.7)", lightColor: "#e6e6e6" },
    { emoji: "🐻‍❄️", color: "rgba(46,107,138,0.7)", lightColor: "#d6ecf5" },
    { emoji: "🐨", color: "rgba(74,107,92,0.7)", lightColor: "#dfeee6" },
    { emoji: "🐯", color: "rgba(163,114,15,0.7)", lightColor: "#f9ecc4" },
    { emoji: "🦁", color: "rgba(122,107,21,0.7)", lightColor: "#f2edc4" },
    { emoji: "🐮", color: "rgba(74,63,56,0.7)", lightColor: "#e8e2da" },
    { emoji: "🐷", color: "rgba(163,61,138,0.7)", lightColor: "#f7dcec" },
    { emoji: "🐸", color: "rgba(47,122,61,0.7)", lightColor: "#dcf0de" },
    { emoji: "🐵", color: "rgba(122,82,40,0.7)", lightColor: "#f0e0c4" },
    { emoji: "🐔", color: "rgba(156,46,46,0.7)", lightColor: "#f7d9d9" },
    { emoji: "🐧", color: "rgba(34,58,94,0.7)", lightColor: "#dbe4f0" },
    { emoji: "🐤", color: "rgba(163,134,15,0.7)", lightColor: "#f9edc0" },
    { emoji: "🦄", color: "rgba(122,74,156,0.7)", lightColor: "#ecdcf5" },
    { emoji: "🐲", color: "rgba(31,122,107,0.7)", lightColor: "#d4f0ea" },
    { emoji: "🐺", color: "rgba(58,58,107,0.7)", lightColor: "#e1e0f0" },
    { emoji: "🐗", color: "rgba(74,46,58,0.7)", lightColor: "#ecdce2" },
] as const;
