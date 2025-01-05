import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-bold">App Sidebar</h2>
        <Button onClick={toggleSidebar} variant="outline">Toggle</Button>
      </div>
      <nav className="mt-4">
        <ul>
          <li>
            <Link to="/sales/orders" className="block p-2 hover:bg-gray-200">Sales Orders</Link>
          </li>
          <li>
            <Link to="/inventory" className="block p-2 hover:bg-gray-200">Inventory</Link>
          </li>
          <li>
            <Link to="/customers" className="block p-2 hover:bg-gray-200">Customers</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
