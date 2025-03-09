import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { SearchForm } from "@/components/SearchForm";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for packages
const packages = [
  {
    id: 1,
    name: "Aventura en Cuetzalan",
    hotel: {
      id: 1,
      name: "Hotel Boutique Cuetzalan",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
      rating: 4.8,
      location: "Centro Histórico"
    },
    tour: {
      id: 1,
      name: "Cascadas de Cuetzalan",
      image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
      duration: "8 horas"
    },
    price: 3599,
    originalPrice: 4499,
    discount: "20%",
    description: "Combina una estancia en el mejor hotel boutique con un tour a las majestuosas cascadas"
  },
  // Add more package options...
];

export default function PackageListPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"packages" | "custom">("packages");
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

  const handlePackageSelection = (pkg: any) => {
    // Preserve existing search parameters and add package details
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('packageId', pkg.id.toString());
    currentParams.set('hotelId', pkg.hotel.id.toString());
    currentParams.set('tourId', pkg.tour.id.toString());
    currentParams.set('type', 'package');
    setLocation(`/payment?${currentParams.toString()}`);
  };

  const canCompleteCustomPackage = selectedHotel && selectedTour && searchParams.startDate && searchParams.endDate;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Paquetes en Cuetzalan</h1>

        <Card className="mb-8 relative z-10">
          <div className="p-6">
            <SearchForm 
              onSearch={handleSearch} 
              searchType="both"
              initialStartDate={searchParams.startDate}
              initialEndDate={searchParams.endDate}
              initialGuests={searchParams.guests}
              initialRooms={searchParams.rooms}
            />
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "packages" | "custom")}>
          <TabsList className="mb-8">
            <TabsTrigger value="packages">Paquetes Predefinidos</TabsTrigger>
            <TabsTrigger value="custom">Crear Paquete Personalizado</TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "packages" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="relative">
                      <img
                        src={pkg.hotel.image}
                        alt={pkg.hotel.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 left-2">Hotel</Badge>
                    </div>
                    <div className="relative">
                      <img
                        src={pkg.tour.image}
                        alt={pkg.tour.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 left-2">Tour</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            MXN ${pkg.price.toLocaleString()}
                          </div>
                          <div className="text-sm line-through text-gray-400">
                            MXN ${pkg.originalPrice.toLocaleString()}
                          </div>
                        </div>
                        <Badge variant="destructive">-{pkg.discount}</Badge>
                      </div>

                      <Button 
                        className="w-full"
                        onClick={() => handlePackageSelection(pkg)}
                      >
                        Reservar Paquete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Custom Package Builder */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Selecciona tu Hotel</h2>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-4">
                  {/* We'll add hotel selection component here */}
                  <div className="text-sm text-gray-500">
                    {searchParams.startDate ? (
                      "Cargando hoteles disponibles..."
                    ) : (
                      "Selecciona primero las fechas de tu estancia usando el buscador superior"
                    )}
                  </div>
                </div>
              </ScrollArea>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Selecciona tu Tour</h2>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-4">
                  {/* We'll add tour selection component here */}
                  <div className="text-sm text-gray-500">
                    {searchParams.startDate ? (
                      "Cargando tours disponibles..."
                    ) : (
                      "Escoge el tour que mejor se adapte a tu estancia"
                    )}
                  </div>
                </div>
              </ScrollArea>
            </Card>

            {/* Summary Card */}
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
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Ningún tour seleccionado</div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  className="w-full" 
                  disabled={!canCompleteCustomPackage}
                  onClick={() => {
                    if (canCompleteCustomPackage) {
                      const currentParams = new URLSearchParams(window.location.search);
                      currentParams.set('hotelId', selectedHotel.id.toString());
                      currentParams.set('tourId', selectedTour.id.toString());
                      currentParams.set('type', 'custom_package');
                      setLocation(`/payment?${currentParams.toString()}`);
                    }
                  }}
                >
                  Completar Reservación
                </Button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  {!canCompleteCustomPackage && "Selecciona un hotel y un tour para continuar"}
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}