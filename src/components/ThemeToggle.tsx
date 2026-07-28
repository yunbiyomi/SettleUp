import { Theme } from "../types/theme";

interface ThemeToggleProps {
    theme: Theme;
    onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={onToggle}
            aria-label={theme === Theme.dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
        >
            {theme === Theme.dark ? "☀️" : "🌙"}
        </button>
    );
}
