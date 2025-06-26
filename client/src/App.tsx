import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import AgentDashboard from "@/pages/dashboard/agent";
import ManagerDashboard from "@/pages/dashboard/manager";
import AdminDashboard from "@/pages/dashboard/admin";
import InvestorDashboard from "@/pages/dashboard/investor";
import Tutorials from "@/pages/tutorials";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Analytics from "@/pages/analytics";
import Support from "@/pages/support";
import Help from "@/pages/help";
import ApiDocs from "@/pages/api-docs";
import Integrations from "@/pages/integrations";
import Blog from "@/pages/blog";
import Community from "@/pages/community";
import Careers from "@/pages/careers";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/properties" component={Properties} />
          <Route path="/dashboard/agent" component={AgentDashboard} />
          <Route path="/dashboard/manager" component={ManagerDashboard} />
          <Route path="/dashboard/admin" component={AdminDashboard} />
          <Route path="/dashboard/investor" component={InvestorDashboard} />
          <Route path="/tutorials" component={Tutorials} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/support" component={Support} />
          <Route path="/help" component={Help} />
          <Route path="/api-docs" component={ApiDocs} />
          <Route path="/integrations" component={Integrations} />
          <Route path="/blog" component={Blog} />
          <Route path="/community" component={Community} />
          <Route path="/careers" component={Careers} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;