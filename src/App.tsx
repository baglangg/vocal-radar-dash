import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Calls from "./pages/Calls";
import CallDetails from "./pages/CallDetails";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-surface">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/upload" element={<AppLayout><Upload /></AppLayout>} />
          <Route path="/calls" element={<AppLayout><Calls /></AppLayout>} />
          <Route path="/calls/:id" element={<AppLayout><CallDetails /></AppLayout>} />
          <Route path="/clients" element={<AppLayout><Clients /></AppLayout>} />
          <Route path="/audits" element={<AppLayout><div className="text-center py-12"><h2 className="text-2xl font-semibold">Аудит</h2><p className="text-muted-foreground mt-2">Coming soon</p></div></AppLayout>} />
          <Route path="/groups" element={<AppLayout><div className="text-center py-12"><h2 className="text-2xl font-semibold">Группы</h2><p className="text-muted-foreground mt-2">Coming soon</p></div></AppLayout>} />
          <Route path="/tickets" element={<AppLayout><div className="text-center py-12"><h2 className="text-2xl font-semibold">Тикеты</h2><p className="text-muted-foreground mt-2">Coming soon</p></div></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
