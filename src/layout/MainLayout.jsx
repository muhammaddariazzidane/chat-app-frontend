/* eslint-disable react/prop-types */
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

export default function MainLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
