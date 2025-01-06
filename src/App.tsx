import { Routes, Route } from "react-router-dom";
import BudgetManagementPage from "./pages/backoffice/budget";
import AddBudgetPage from "./pages/backoffice/budget/add";
import AddMoneyOrderPage from "./pages/backoffice/budget/add-money-order";
import HomePage from "./pages/Home"; // Example of another import
import NotFoundPage from "./pages/NotFound"; // Example of another import

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/backoffice/budget" element={<BudgetManagementPage />} />
        <Route path="/backoffice/budget/add" element={<AddBudgetPage />} />
        <Route path="/backoffice/budget/add-money-order" element={<AddMoneyOrderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
