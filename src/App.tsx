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
import Groups from "./pages/Groups";
import Tickets from "./pages/Tickets";
import Users from "./pages/Users";
import Audits from "./pages/Audits";
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
          <Route path="/audits" element={<AppLayout><Audits /></AppLayout>} />
          <Route path="/groups" element={<AppLayout><Groups /></AppLayout>} />
          <Route path="/tickets" element={<AppLayout><Tickets /></AppLayout>} />
          <Route path="/users" element={<AppLayout><Users /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
