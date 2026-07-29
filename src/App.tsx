import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MemberPage from "./page/MemberPage";
import ExpensesPage from "./page/ExpensesPage";
import ResultPage from "./page/ResultPage";
import { SettlementProvider } from "./context/SettleContext";
import ThemeToggle from "./components/ThemeToggle";
import { Theme } from "./types/theme";

const router = createBrowserRouter([
    { path: "/", element: <MemberPage /> },
    { path: "/expenses", element: <ExpensesPage /> },
    { path: "/result", element: <ResultPage /> },
]);

export default function App() {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme");
        return saved === Theme.light || saved === Theme.dark ? saved : Theme.light;
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => (prev === Theme.dark ? Theme.light : Theme.dark));
    }

    return (
        <SettlementProvider>
            <RouterProvider router={router} />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </SettlementProvider>
    );
}
