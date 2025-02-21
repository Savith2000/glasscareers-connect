
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SubmitJob from "./pages/SubmitJob";
import AdminPanel from "./pages/AdminPanel";
import JobListings from "./pages/JobListings";
import ApplyJob from "./pages/ApplyJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/submit-job" element={<SubmitJob />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/apply/:id" element={<ApplyJob />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
