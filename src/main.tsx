import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n.ts";
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <SidebarProvider>
      <LanguageProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </LanguageProvider>
    </SidebarProvider>
  </BrowserRouter>
);