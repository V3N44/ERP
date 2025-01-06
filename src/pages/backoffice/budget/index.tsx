import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BudgetManagementPage = () => {
  const navigate = useNavigate();

  const handleAddBudget = () => {
    navigate("/backoffice/budget/add");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <Button onClick={handleAddBudget}>Add New Budget</Button>
      </div>
    </div>
  );
};

export default BudgetManagementPage;