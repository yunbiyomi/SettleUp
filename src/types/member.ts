export interface Member {
    id: string;
    name: string;
    emoji: string;
    color: string;
    lightColor: string;
}

export const MEMBER_STYLES = [
    { emoji: '🐶', color: '#4a3728', lightColor: '#f5e6d8' },
    { emoji: '🐱', color: '#332b52', lightColor: '#e6e0f5' },
    { emoji: '🐭', color: '#3d3833', lightColor: '#ece9e4' },
    { emoji: '🐹', color: '#5c3a1e', lightColor: '#f7e2cc' },
    { emoji: '🐰', color: '#5c2d3a', lightColor: '#f7dfe6' },
    { emoji: '🦊', color: '#5c3417', lightColor: '#f7e0c8' },
    { emoji: '🐻', color: '#3d2b1f', lightColor: '#ece1d6' },
    { emoji: '🐼', color: '#2a2a2a', lightColor: '#e8e8e8' },
    { emoji: '🐻‍❄️', color: '#1e3a4a', lightColor: '#d9e8f0' },
    { emoji: '🐨', color: '#33403a', lightColor: '#dde8e2' },
    { emoji: '🐯', color: '#5c3312', lightColor: '#f7e1c5' },
    { emoji: '🦁', color: '#5c4a1a', lightColor: '#f7edc8' },
    { emoji: '🐮', color: '#2e2e2e', lightColor: '#e9e9e9' },
    { emoji: '🐷', color: '#5c3040', lightColor: '#f7dfe8' },
    { emoji: '🐸', color: '#1e4a2e', lightColor: '#d9f0e0' },
    { emoji: '🐵', color: '#4a3320', lightColor: '#f0e2cf' },
    { emoji: '🐔', color: '#5c1e1e', lightColor: '#f7d9d9' },
    { emoji: '🐧', color: '#1e2a3d', lightColor: '#dbe1ec' },
    { emoji: '🐤', color: '#5c4a12', lightColor: '#f7edc0' },
    { emoji: '🦄', color: '#4a2d5c', lightColor: '#ecdff2' },
    { emoji: '🐲', color: '#1e4a3d', lightColor: '#d9f0e8' },
    { emoji: '🐺', color: '#2e3540', lightColor: '#e2e5ea' },
    { emoji: '🐗', color: '#3d2818', lightColor: '#ece2d5' },
  ] as const;
