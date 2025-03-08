import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, SortAsc, ChevronLeft, ChevronRight, X, Search, Edit3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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
    startDate: "15 Dic 2025",
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
    startDate: "Jun - Sep 2025",
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
    startDate: "Jun - Sep 2025",
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

export default function TourListPage() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = new URLSearchParams(location.split('?')[1]);

  const [, setLocation] = useLocation();

  const handleEditSearch = () => {
    setLocation("/");
  };

  // Loading skeleton for tour cards
  const TourCardSkeleton = () => (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-40" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="pt-2">
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Search Summary Box */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold mb-1">Resultados de búsqueda</h2>
                <p className="text-sm text-gray-600">
                  Destino: {searchParams.get('destination') || 'Todos los destinos'} •
                  Fecha: {searchParams.get('startDate') ? new Date(searchParams.get('startDate')!).toLocaleDateString() : 'Cualquier fecha'} •
                  Duración: {searchParams.get('nights') || 'Cualquier duración'}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleEditSearch}
              className="flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Editar búsqueda
            </Button>
          </div>
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
                      <Badge className="absolute top-2 left-2 bg-white text-primary text-xs">
                        Salidas garantizadas
                      </Badge>
                      <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
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
                            {tour.startDate}
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