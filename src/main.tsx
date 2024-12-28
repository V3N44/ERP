// import { createRoot } from 'react-dom/client'
// import { SidebarProvider } from "@/components/ui/sidebar"
// import App from './App.tsx'
// import './index.css'

// createRoot(document.getElementById("root")!).render(
//   <SidebarProvider>
//     <App />
//   </SidebarProvider>
// );



import { createRoot } from 'react-dom/client';
import { SidebarProvider } from "@/components/ui/sidebar";
import { LanguageProvider } from "@/contexts/LanguageContext"; // Assuming you have a LanguageContext for managing i18n
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n.ts"; // Import the i18n configuration
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Check your index.html file.");
}

const root = createRoot(rootElement);

root.render(
  <LanguageProvider>
    <SidebarProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </SidebarProvider>
  </LanguageProvider>
);
