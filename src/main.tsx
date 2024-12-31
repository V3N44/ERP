import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import i18n from './i18n/i18n';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <SidebarProvider>
    <BrowserRouter>
      <LanguageProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </LanguageProvider>
    </BrowserRouter>
  </SidebarProvider>
);