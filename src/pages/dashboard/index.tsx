import { DashboardCharts } from "@/components/DashboardCharts";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const fetchDashboardData = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  
  return response.json();
};

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardMetrics data={dashboardData?.metrics || {}} />
      </div>

      <Card className="p-4">
        <DashboardCharts data={{
          sales: dashboardData?.charts?.sales || [],
          purchases: dashboardData?.charts?.purchases || [],
          dates: dashboardData?.charts?.dates || []
        }} />
      </Card>
    </div>
  );
};

export default Dashboard;