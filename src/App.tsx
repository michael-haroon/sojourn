
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import TripsPage from "./pages/TripsPage";
import NotFound from "./pages/NotFound";
import AccountPage from "@/pages/Account";
import EditProfile from "@/pages/EditProfile";

const queryClient = new QueryClient();

import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

function GuardedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trips" element={
            <GuardedRoute>
              <TripsPage />
            </GuardedRoute>
          } />
          <Route path="/account" element={
            <GuardedRoute>
              <AccountPage />
            </GuardedRoute>
          } />
          <Route path="/edit-profile" element={
            <GuardedRoute>
              <EditProfile />
            </GuardedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
