import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLeads from "./pages/admin/Leads";
import AdminUsers from "./pages/admin/Users";
import AdminApiIntegrations from "./pages/admin/ApiIntegrations";
import AdminSettings from "./pages/admin/Settings";
import Agradecimento from "./pages/Agradecimento";
import Obrigado from "./pages/Obrigado";

const queryClient = new QueryClient();

function AuthRecoveryRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Se o email de recuperação estiver apontando para a Home, redireciona para /auth mantendo code/hash
    if (location.pathname !== "/") return;

    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");

    const isRecovery = Boolean(code) || type === "recovery";
    if (!isRecovery) return;

    navigate(`/auth${location.search}${window.location.hash}`, { replace: true });
  }, [location.pathname, location.search, navigate]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AuthRecoveryRedirect />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/agradecimento" element={<Agradecimento />} />
            <Route path="/obrigado" element={<Obrigado />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/api" element={<AdminApiIntegrations />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

