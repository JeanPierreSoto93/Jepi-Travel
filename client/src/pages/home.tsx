import Navbar from "@/components/navbar";
import HeroSearch from "@/components/hero-search";
import BookingTabs from "@/components/booking-tabs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSearch />
        <BookingTabs />
      </main>
    </div>
  );
}
