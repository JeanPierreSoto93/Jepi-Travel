import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, SortAsc, X, Search, Edit3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchForm } from "@/components/SearchForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock tours data
const tours = [
  {
    id: 1,
    title: "Cascadas de Cuetzalan",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
    discount: "20%",
    description: "Explora las majestuosas cascadas de Cuetzalan, incluyendo la famosa cascada Las Brisas y Velo de Novia.",
    startDate: "2025-12-15",
    price: 1899,
    originalPrice: 2375,
    tags: ["Aventura", "Naturaleza"]
  },
  {
    id: 2,
    title: "Centro Histórico y Artesanías",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1740",
    discount: "15%",
    description: "Recorre el centro histórico de Cuetzalan, visita su iglesia principal y mercado de artesanías.",
    startDate: "2025-06-01",
    price: 2199,
    originalPrice: 2599,
    tags: ["Cultural", "Historia"]
  },
  {
    id: 3,
    title: "Grutas de Cuetzalan",
    image: "https://images.unsplash.com/photo-1499915174960-6f5340157928?q=80&w=1740",
    discount: "25%",
    description: "Aventúrate en las misteriosas grutas de Cuetzalan y descubre sus formaciones geológicas.",
    startDate: "2025-06-01",
    price: 1699,
    originalPrice: 2265,
    tags: ["Aventura", "Naturaleza"]
  }
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

// Custom Cuetzalan-themed skeleton loader component
const TourCardSkeleton = () => (
  <Card className="overflow-hidden relative">
    {/* Top decorative pattern */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 animate-shimmer" />

    {/* Image skeleton with Cuetzalan-style overlay */}
    <div className="relative">
      <Skeleton className="w-full h-40" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.1)_25%,rgba(68,64,60,0.1)_50%,transparent_50%,transparent_75%,rgba(68,64,60,0.1)_75%)] bg-[length:10px_10px]" />
    </div>

    {/* Content skeleton with traditional pattern spacing */}
    <div className="p-4 space-y-3">
      {/* Title with zigzag pattern */}
      <div className="relative">
        <Skeleton className="h-5 w-3/4" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
      </div>

      {/* Description lines with decorative elements */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-5/6" />
          <div className="h-3 w-3 rounded-full bg-primary/20 animate-pulse" />
        </div>
      </div>

      {/* Price and details section */}
      <div className="mt-4 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>

        {/* Tags skeleton with traditional spacing */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        {/* Price block with decorative corner */}
        <div className="relative">
          <Skeleton className="h-6 w-32" />
          <div className="absolute -right-1 -top-1 h-3 w-3 rotate-45 bg-primary/20 animate-pulse" />
        </div>

        {/* Action buttons with wave pattern */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
      </div>
    </div>

    {/* Bottom decorative pattern */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 animate-shimmer" />
  </Card>
);

const shimmerAnimation = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(to right, transparent 0%, rgba(var(--primary) / 0.1) 50%, transparent 100%);
    background-size: 1000px 100%;
  }
`;

// Format date for display in a more compact way
const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short'
  });
};

export default function TourListPage() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const searchParams = new URLSearchParams(location.split('?')[1]);


  const searchSummary = {
    destination: searchParams.get('destination') || 'Todos los destinos',
    startDate: formatDate(searchParams.get('startDate')),
    endDate: formatDate(searchParams.get('endDate')),
    nights: searchParams.get('nights') || null,
    guests: searchParams.get('guests') || '2',
    type: searchParams.get('type') || 'tours'
  };

  // Create compact search summary text
  const getCompactSummary = () => {
    let summary = searchSummary.destination;

    if (searchSummary.startDate && searchSummary.endDate) {
      summary += ` • ${searchSummary.startDate} - ${searchSummary.endDate}`;
    } else if (searchSummary.startDate) {
      summary += ` • ${searchSummary.startDate}`;
    }

    if (searchSummary.nights) {
      summary += ` • ${searchSummary.nights}`;
    }

    if (searchSummary.guests) {
      summary += ` • ${searchSummary.guests} ${parseInt(searchSummary.guests) === 1 ? 'viajero' : 'viajeros'}`;
    }

    return summary;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Search Summary Box */}
        <Card className="mb-8">
          {showSearchForm ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Modificar búsqueda</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearchForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <SearchForm isInline={true} onSearch={() => setShowSearchForm(false)} />
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Search className="h-4 w-4 text-primary flex-shrink-0" />
                  <p className="text-sm truncate">
                    {getCompactSummary()}
                  </p>
                </div>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearchForm(true)}
                  className="flex-shrink-0"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar - Always visible on desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-4">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Filtros</h2>
                </div>
                <FilterContent />
              </Card>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden mb-4">
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

          {/* Tour Listings */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{tours.length} tours encontrados</p>
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

            {/* Tour Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Show skeletons while loading
                Array(6).fill(0).map((_, index) => (
                  <TourCardSkeleton key={index} />
                ))
              ) : (
                // Show actual tour cards
                tours.map((tour) => (
                  <Card key={tour.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600 text-xs">
                        -{tour.discount}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                        {tour.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {tour.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="text-gray-600">Fechas de Viaje</div>
                          <div className="font-medium">
                            {formatDate(tour.startDate)}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {tour.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs px-2 py-0"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-[10px] text-gray-600">Precio desde</div>
                            <div className="text-base font-bold text-primary">
                              MXN$ {tour.price.toLocaleString()}
                            </div>
                            <div className="text-xs line-through text-gray-400">
                              MXN$ {tour.originalPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-8"
                          >
                            Más info
                          </Button>
                          <Button
                            size="sm"
                            className="text-xs h-8"
                          >
                            Reservar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}