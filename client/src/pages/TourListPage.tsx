import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, SortAsc, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock tours data
const mockTours = [
  {
    id: 1,
    title: "Cascadas de Cuetzalan",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
    description: "Explora las majestuosas cascadas de Cuetzalan, incluyendo la famosa cascada Las Brisas y Velo de Novia.",
    duration: "1 día",
    price: 1899,
    originalPrice: 2375,
    rating: 4.8,
    reviews: 128,
    discount: "20%",
    tags: ["Aventura", "Naturaleza"]
  },
  // Add more mock tours...
];

const FilterContent = () => (
  <div className="space-y-6">
    {/* Price Range */}
    <div>
      <h3 className="font-medium mb-3">Rango de precio</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>$0 - $1,000</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>$1,000 - $2,000</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>$2,000+</span>
        </label>
      </div>
    </div>

    <Separator />

    {/* Duration */}
    <div>
      <h3 className="font-medium mb-3">Duración</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Medio día</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Día completo</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Varios días</span>
        </label>
      </div>
    </div>

    <Separator />

    {/* Categories */}
    <div>
      <h3 className="font-medium mb-3">Categorías</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Aventura</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Cultural</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Gastronómico</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Naturaleza</span>
        </label>
      </div>
    </div>
  </div>
);

export default function TourListPage() {
  const [location] = useLocation();
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);
  const searchParams = new URLSearchParams(location.split('?')[1]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Search Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tours en Cuetzalan</h1>
            <p className="text-gray-600">
              Mostrando resultados para: {searchParams.get('destination') || 'Todos los tours'}
            </p>
          </div>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtros de búsqueda</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className={`hidden lg:block ${showDesktopFilters ? 'lg:w-1/4' : 'lg:w-auto'}`}>
            <div className="sticky top-4">
              <Card className={`${showDesktopFilters ? 'p-6' : 'p-2'}`}>
                <div className="flex items-center justify-between mb-4">
                  {showDesktopFilters && (
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      <h2 className="text-lg font-semibold">Filtros</h2>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDesktopFilters(!showDesktopFilters)}
                    className="ml-auto"
                  >
                    {showDesktopFilters ? <ChevronLeft /> : <ChevronRight />}
                  </Button>
                </div>

                {showDesktopFilters && <FilterContent />}
              </Card>
            </div>
          </div>

          {/* Tour Listings */}
          <div className={`flex-1 ${showDesktopFilters ? 'lg:w-3/4' : 'lg:w-full'}`}>
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{mockTours.length} tours encontrados</p>
              <div className="flex items-center gap-2">
                <SortAsc className="h-5 w-5 text-gray-400" />
                <select className="border rounded-md px-2 py-1">
                  <option>Precio: Menor a mayor</option>
                  <option>Precio: Mayor a menor</option>
                  <option>Mejor valorados</option>
                  <option>Más populares</option>
                </select>
              </div>
            </div>

            {/* Tour Cards */}
            <div className="space-y-6">
              {mockTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img 
                        src={tour.image} 
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-500">★</span>
                            <span className="font-medium">{tour.rating}</span>
                            <span className="text-gray-500">({tour.reviews} reseñas)</span>
                          </div>
                        </div>
                        <Badge variant="destructive">
                          {tour.discount} OFF
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{tour.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {tour.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Duración: {tour.duration}</p>
                          <div className="mt-1">
                            <span className="text-2xl font-bold text-primary">
                              MXN ${tour.price.toLocaleString()}
                            </span>
                            <span className="ml-2 text-sm line-through text-gray-400">
                              MXN ${tour.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Button>Ver detalles</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}