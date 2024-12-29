import { BrowserRouter as Router } from 'react-router-dom';
import { AppSidebar } from './components/AppSidebar';
import { ChatBot } from './components/ChatBot';
import { ChatProvider } from './contexts/ChatContext';
import { Toaster } from './components/ui/toaster';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import ServicePage from './pages/service';
import VehiclesPage from './pages/vehicles';
import SalesPage from './pages/sales';
import CustomersPage from './pages/customers';
import AdminPage from './pages/admin';
import NotificationsPage from './pages/notifications';
import SupportPage from './pages/support';
import FinancePage from './pages/finance';

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="flex min-h-screen bg-background">
          <AppSidebar />
          <main className="flex-1 overflow-x-hidden">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/service/*" element={<ServicePage />} />
              <Route path="/vehicles/*" element={<VehiclesPage />} />
              <Route path="/sales/*" element={<SalesPage />} />
              <Route path="/customers/*" element={<CustomersPage />} />
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="/notifications/*" element={<NotificationsPage />} />
              <Route path="/support/*" element={<SupportPage />} />
              <Route path="/finance/*" element={<FinancePage />} />
              <Route path="/" element={<DashboardPage />} />
            </Routes>
          </main>
          <ChatBot />
        </div>
        <Toaster />
      </Router>
    </ChatProvider>
  );
}

export default App;