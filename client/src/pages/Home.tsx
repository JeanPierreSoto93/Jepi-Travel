import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SearchForm } from "@/components/SearchForm";
import { TourCards } from "@/components/TourCards";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <SearchForm />
        <TourCards />
      </main>
    </div>
  );
}