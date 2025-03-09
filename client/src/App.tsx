import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TourListPage from "@/pages/TourListPage";
import HotelListPage from "@/pages/HotelListPage";
import HotelDetailPage from "@/pages/HotelDetailPage";
import TourDetailPage from "@/pages/TourDetailPage";
import PaymentPage from "@/pages/PaymentPage";
import ConfirmationPage from "@/pages/ConfirmationPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tours" component={TourListPage} />
      <Route path="/hotels" component={HotelListPage} />
      <Route path="/hotels/:id" component={HotelDetailPage} />
      <Route path="/tours/:id" component={TourDetailPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/confirmation/:id" component={ConfirmationPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;