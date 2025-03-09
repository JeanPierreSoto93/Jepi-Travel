import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { SearchForm } from "@/components/SearchForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Calendar, Users, Star } from "lucide-react";
import classnames from "classnames";

// Mock data for available hotels and tours
const availableHotels = [
  {
    id: 1,
    name: "Hotel Boutique Cuetzalan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
    rating: 4.8,
    location: "Centro Histórico",
    price: 1500,
    description: "Hermoso hotel boutique en el corazón de Cuetzalan"
  },
  {
    id: 2,
    name: "Posada del Valle",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1740",
    rating: 4.5,
    location: "Valle de Cuetzalan",
    price: 1200,
    description: "Rodeado de naturaleza y vistas panorámicas"
  }
];

const availableTours = [
  {
    id: 1,
    name: "Cascadas de Cuetzalan",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
    duration: "8 horas",
    price: 800,
    description: "Explora las majestuosas cascadas de la región"
  },
  {
    id: 2,
    name: "Tour Cultural",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1740",
    duration: "6 horas",
    price: 600,
    description: "Descubre la rica cultura y tradiciones locales"
  }
];

export default function PackageListPage() {
  const [, setLocation] = useLocation();
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [searchParams, setSearchParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      startDate: params.get("startDate") || "",
      endDate: params.get("endDate") || "",
      guests: Number(params.get("guests")) || 2,
      rooms: Number(params.get("rooms")) || 1
    };
  });

  const handleSearch = (params: any) => {
    setSearchParams(params);
    // Store search parameters in URL
    const urlParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, String(value));
      }
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedHotel) total += selectedHotel.price;
    if (selectedTour) total += selectedTour.price;
    return total;
  };

  const canCompletePackage = selectedHotel && selectedTour && searchParams.startDate && searchParams.endDate;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Crea tu Paquete en Cuetzalan</h1>

        <Card className="mb-8 relative z-10">
          <div className="p-6">
            <SearchForm 
              onSearch={handleSearch} 
              initialStartDate={searchParams.startDate}
              initialEndDate={searchParams.endDate}
              initialGuests={searchParams.guests}
              initialRooms={searchParams.rooms}
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hotels Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Hoteles Disponibles</h2>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {searchParams.startDate ? (
                  availableHotels.map((hotel) => (
                    <Card 
                      key={hotel.id}
                      className={classnames(
                        "cursor-pointer transition-all hover:shadow-md",
                        selectedHotel?.id === hotel.id ? "ring-2 ring-primary" : ""
                      )}
                      onClick={() => setSelectedHotel(hotel)}
                    >
                      <div className="flex gap-4 p-4">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-32 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{hotel.name}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{hotel.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {hotel.location}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{hotel.description}</p>
                          <div className="mt-2 font-semibold">
                            MXN ${hotel.price}/noche
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Selecciona las fechas de tu estancia para ver hoteles disponibles
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* Tours Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tours Disponibles</h2>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {searchParams.startDate ? (
                  availableTours.map((tour) => (
                    <Card 
                      key={tour.id}
                      className={classnames(
                        "cursor-pointer transition-all hover:shadow-md",
                        selectedTour?.id === tour.id ? "ring-2 ring-primary" : ""
                      )}
                      onClick={() => setSelectedTour(tour)}
                    >
                      <div className="flex gap-4 p-4">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-32 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{tour.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {tour.duration}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{tour.description}</p>
                          <div className="mt-2 font-semibold">
                            MXN ${tour.price}/persona
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Selecciona las fechas de tu estancia para ver tours disponibles
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* Package Summary */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-semibold mb-4">Resumen de tu Paquete</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Hotel Seleccionado</h3>
                {selectedHotel ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedHotel.image}
                      alt={selectedHotel.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{selectedHotel.name}</p>
                      <p className="text-sm text-gray-500">{selectedHotel.location}</p>
                      <p className="text-sm font-medium mt-1">MXN ${selectedHotel.price}/noche</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Ningún hotel seleccionado</div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Tour Seleccionado</h3>
                {selectedTour ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedTour.image}
                      alt={selectedTour.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{selectedTour.name}</p>
                      <p className="text-sm text-gray-500">{selectedTour.duration}</p>
                      <p className="text-sm font-medium mt-1">MXN ${selectedTour.price}/persona</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Ningún tour seleccionado</div>
                )}
              </div>
            </div>

            {canCompletePackage && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total del Paquete</span>
                  <span className="text-xl font-bold">MXN ${calculateTotal()}</span>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button 
                className="w-full" 
                disabled={!canCompletePackage}
                onClick={() => {
                  if (canCompletePackage) {
                    const currentParams = new URLSearchParams(window.location.search);
                    currentParams.set('hotelId', selectedHotel.id.toString());
                    currentParams.set('tourId', selectedTour.id.toString());
                    currentParams.set('type', 'custom_package');
                    currentParams.set('total', calculateTotal().toString());
                    setLocation(`/payment?${currentParams.toString()}`);
                  }
                }}
              >
                Completar Reservación
              </Button>
              <p className="text-xs text-center mt-2 text-gray-500">
                {!canCompletePackage && "Selecciona un hotel y un tour para continuar"}
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}