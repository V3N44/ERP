import { ThemeProvider } from "next-themes";
import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import SettingsPage from "./pages/admin/settings";
import SalesOrdersPage from "./pages/sales/orders";
import ShippingPage from "./pages/shipping";
import ServiceCenterPage from "./pages/service";
import InventoryPage from "./pages/shipping/inventory";
import FreightForwardersPage from "./pages/shipping/freight-forwarders";
import TrackingPage from "./pages/shipping/tracking";
import WarehousesPage from "./pages/shipping/warehouses";
import FAQsPage from "./pages/support/faqs";
import ContactPage from "./pages/support/contact";
import DocumentationPage from "./pages/support/docs";
import DocumentsPage from "./pages/vehicles/documents";
import MaintenancePage from "./pages/vehicles/maintenance";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 ml-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/sales/orders" element={<SalesOrdersPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/service" element={<ServiceCenterPage />} />
            <Route path="/shipping/inventory" element={<InventoryPage />} />
            <Route path="/shipping/freight-forwarders" element={<FreightForwardersPage />} />
            <Route path="/shipping/tracking" element={<TrackingPage />} />
            <Route path="/shipping/warehouses" element={<WarehousesPage />} />
            <Route path="/support/faqs" element={<FAQsPage />} />
            <Route path="/support/contact" element={<ContactPage />} />
            <Route path="/support/docs" element={<DocumentationPage />} />
            <Route path="/vehicles/documents" element={<DocumentsPage />} />
            <Route path="/vehicles/maintenance" element={<MaintenancePage />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;