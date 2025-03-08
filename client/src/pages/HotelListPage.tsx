import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, SortAsc, X, Search, Edit3, Wifi, Waves, Heart, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchForm } from "@/components/SearchForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock hotels data
const hotels = [
  {
    id: 1,
    name: "Hotel Boutique Cuetzalan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
    description: "Hermoso hotel boutique en el corazón de Cuetzalan, con vistas panorámicas y arquitectura colonial.",
    rating: 7.6,
    reviews: 465,
    price: 1899,
    originalPrice: 2375,
    discount: "62%",
    amenities: ["Todo incluido", "Alberca", "Tina de hidromasaje"],
    isRefundable: true,
    location: "Zona Hotelera",
    vipAccess: true
  },
  {
    id: 2,
    name: "Posada Real Cuetzalan",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1740",
    description: "Tradicional posada con encanto local, jardines exuberantes y ambiente familiar.",
    rating: 4.5,
    reviews: 96,
    price: 1599,
    originalPrice: 1899,
    discount: "15%",
    amenities: ["wifi", "parking", "restaurant"],
    isRefundable: false,
    location: "Barrio de Zacatipan, Cuetzalan",
    vipAccess: false
  },
  {
    id: 3,
    name: "Hotel & Spa Valle Verde",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1740",
    description: "Lujoso hotel con spa, rodeado de naturaleza y perfecta para una escapada relajante.",
    rating: 4.9,
    reviews: 156,
    price: 2499,
    originalPrice: 2999,
    discount: "17%",
    amenities: ["wifi", "pool", "parking", "restaurant", "spa"],
    isRefundable: true,
    location: "Zona Panorámica, Cuetzalan",
    vipAccess: false
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

    {/* Amenities */}
    <div>
      <h3 className="font-medium mb-3">Servicios</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Piscina</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>WiFi gratis</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Estacionamiento</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Restaurante</span>
        </label>
      </div>
    </div>

    <Separator />

    {/* Room Types */}
    <div>
      <h3 className="font-medium mb-3">Tipo de habitación</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Individual</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Doble</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Suite</span>
        </label>
      </div>
    </div>
  </div>
);

// Format date for display in a more compact way
const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short'
  });
};


export default function HotelListPage() {
  const [location] = useLocation();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const searchParams = new URLSearchParams(location.split('?')[1]);

  const searchSummary = {
    destination: searchParams.get('destination') || 'Todos los destinos',
    startDate: formatDate(searchParams.get('startDate')),
    endDate: formatDate(searchParams.get('endDate')),
    nights: searchParams.get('nights') || null,
    guests: searchParams.get('guests') || '2',
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
      summary += ` • ${searchSummary.guests} ${parseInt(searchSummary.guests) === 1 ? 'huésped' : 'huéspedes'}`;
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
          {/* Desktop Filters Sidebar */}
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

          {/* Hotel Listings */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{hotels.length} hoteles encontrados</p>
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

            {/* Hotel Cards Stack */}
            <div className="space-y-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative">
                      <div className="overflow-hidden h-full">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover aspect-video md:aspect-square group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        {hotel.vipAccess && (
                          <Badge className="bg-blue-900 hover:bg-blue-800">
                            VIP Access
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-6 md:w-2/3">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                            <p className="text-sm text-gray-600">{hotel.location}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 px-2 py-1 bg-blue-900 text-white rounded">
                              <span className="font-bold">{hotel.rating}</span>
                              <span className="text-sm">Bueno</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{hotel.reviews} opiniones</p>
                          </div>
                        </div>

                        <div className="flex gap-4 mb-4">
                          {hotel.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <span className="text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto">
                          {hotel.isRefundable && (
                            <p className="text-sm text-emerald-600 mb-2">100% reembolsable</p>
                          )}

                          <div className="flex items-end justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-2xl font-bold">
                                  MXN ${hotel.price.toLocaleString()}
                                </div>
                                <Badge className="bg-emerald-500 hover:bg-emerald-600">
                                  -{hotel.discount}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">
                                MXN ${Math.round(hotel.price * 1.16).toLocaleString()} en total
                              </p>
                              <p className="text-xs text-gray-500">impuestos y cargos incluidos</p>
                            </div>
                            <Button size="lg">
                              Reservar
                            </Button>
                          </div>
                        </div>
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