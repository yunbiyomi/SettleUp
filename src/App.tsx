import { createBrowserRouter, RouterProvider } from "react-router";
import MemberPage from "./page/MemberPage";
import ExpensesPage from "./page/ExpensesPage";
import ResultPage from "./page/ResultPage";
import { SettlementProvider } from "./context/SettleContext";

const router = createBrowserRouter([
  {path: '/', element: <MemberPage /> },
  {path: '/expenses', element: <ExpensesPage /> },
  {path: '/result', element: <ResultPage /> },
]);

export default function App() {
  return (
    <SettlementProvider>
      <RouterProvider router={router} />
    </SettlementProvider>
  )
}
