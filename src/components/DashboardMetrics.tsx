import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Users, ShoppingBag, Warehouse } from "lucide-react";

export const DashboardMetrics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-none shadow-sm rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-heading font-semibold text-gray-700">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-violet-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-bold text-gray-800 animate-scale-in">1,275</div>
            <p className="text-xs font-sans text-emerald-500 mt-1 animate-fade-in">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-100 to-fuchsia-50 border-none shadow-sm rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-heading font-semibold text-gray-700">Total Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-violet-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-bold text-gray-800 animate-scale-in">19</div>
            <p className="text-xs font-sans text-emerald-500 mt-1 animate-fade-in">+3 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-none shadow-sm rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-heading font-semibold text-gray-700">Total Suppliers</CardTitle>
            <Warehouse className="h-4 w-4 text-violet-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-bold text-gray-800 animate-scale-in">8</div>
            <p className="text-xs font-sans text-emerald-500 mt-1 animate-fade-in">Active partnerships</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-none shadow-sm rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-heading font-semibold text-gray-700">Total Sales</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-violet-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-bold text-gray-800 animate-scale-in">23</div>
            <p className="text-xs font-sans text-emerald-500 mt-1 animate-fade-in">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};