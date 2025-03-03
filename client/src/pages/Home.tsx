import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SearchForm } from "@/components/SearchForm";
import { TourCards } from "@/components/TourCards";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <SearchForm />
        <TourCards />
      </main>
      <Footer />
    </div>
  );
}