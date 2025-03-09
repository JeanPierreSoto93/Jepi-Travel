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
  const searchParams = new URLSearchParams(window.location.search);

  const handleSearch = (searchParams: any) => {
    // Handle search logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Paquetes en Cuetzalan</h1>
        
        <Card className="mb-8">
          <div className="p-6">
            <SearchForm onSearch={handleSearch} searchType="both" />
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
                        onClick={() => {
                          // Preserve existing search parameters
                          const currentParams = new URLSearchParams(window.location.search);
                          currentParams.set('packageId', pkg.id.toString());
                          currentParams.set('hotelId', pkg.hotel.id.toString());
                          currentParams.set('tourId', pkg.tour.id.toString());
                          setLocation(`/payment?${currentParams.toString()}`);
                        }}
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
            <div>
              <h2 className="text-xl font-semibold mb-4">Selecciona tu Hotel</h2>
              {/* Add hotel selection component */}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Selecciona tu Tour</h2>
              {/* Add tour selection component */}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
