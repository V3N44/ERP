import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BudgetManagementPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <Button 
          onClick={() => navigate("/backoffice/budget/add")}
          className="bg-primary hover:bg-primary/90"
        >
          Add Monthly Budget
        </Button>
      </div>
      
      <div className="grid gap-4">
        {/* Budget list will be implemented here */}
        <p className="text-muted-foreground">No budgets found. Click the button above to add a new monthly budget.</p>
      </div>
    </div>
  );
};

export default BudgetManagementPage;