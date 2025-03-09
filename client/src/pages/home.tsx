import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import HeroSearch from "@/components/hero-search";
import BookingTabs from "@/components/booking-tabs";

// Mock data for featured tours and hotels
const featuredTours = [
  {
    id: 1,
    title: "Cascadas de Cuetzalan",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
    discount: "20%",
    description: "Explora las majestuosas cascadas de Cuetzalan, incluyendo la famosa cascada Las Brisas y Velo de Novia.",
    startDate: "15 Dic 2025",
    price: 1899,
    originalPrice: 2375
  },
  {
    id: 2,
    title: "Centro Histórico y Artesanías",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1740",
    discount: "15%",
    description: "Recorre el centro histórico de Cuetzalan, visita su iglesia principal y mercado de artesanías.",
    startDate: "Jun - Sep 2025",
    price: 2199,
    originalPrice: 2599
  },
  {
    id: 3,
    title: "Grutas de Cuetzalan",
    image: "https://images.unsplash.com/photo-1499915174960-6f5340157928?q=80&w=1740",
    discount: "25%",
    description: "Aventúrate en las misteriosas grutas de Cuetzalan y descubre sus formaciones geológicas.",
    startDate: "Jun - Sep 2025",
    price: 1699,
    originalPrice: 2265
  }
];

const featuredHotels = [
  {
    id: 1,
    name: "Hotel Boutique Cuetzalan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
    description: "Hermoso hotel boutique en el corazón de Cuetzalan, con vistas panorámicas y arquitectura colonial.",
    price: 1899,
    originalPrice: 2375,
    discount: "20%",
    location: "Centro Histórico, Cuetzalan"
  },
  {
    id: 2,
    name: "Posada Real Cuetzalan",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1740",
    description: "Tradicional posada con encanto local, jardines exuberantes y ambiente familiar.",
    price: 1599,
    originalPrice: 1899,
    discount: "15%",
    location: "Barrio de Zacatipan, Cuetzalan"
  },
  {
    id: 3,
    name: "Hotel & Spa Valle Verde",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1740",
    description: "Lujoso hotel con spa, rodeado de naturaleza y perfecta para una escapada relajante.",
    price: 2499,
    originalPrice: 2999,
    discount: "17%",
    location: "Zona Panorámica, Cuetzalan"
  }
];

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSearch />
        <BookingTabs />

        {/* Featured Tours Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Tours Destacados en Cuetzalan</h2>
              <p className="text-gray-600">
                Descubre experiencias únicas en este Pueblo Mágico de Puebla
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                      </div>
                      <Badge 
                        className="absolute top-4 left-4 bg-white text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                      >
                        Salidas garantizadas
                      </Badge>
                      <Badge 
                        variant="destructive" 
                        className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-300"
                      >
                        Hasta {tour.discount} de descuento
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {tour.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {tour.description}
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">Fechas de Viaje</div>
                          <div className="font-semibold group-hover:text-primary transition-colors duration-300">
                            {tour.startDate}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">Precio desde</div>
                            <div className="text-xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                              MXN$ {tour.price.toLocaleString()}
                            </div>
                            <div className="text-sm line-through text-gray-400">
                              MXN$ {tour.originalPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <Button 
                          className="w-full"
                          onClick={() => setLocation(`/tours/${tour.id}`)}
                        >
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => setLocation('/tours')}>
                Ver todos los tours
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Hotels Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Hoteles Recomendados</h2>
              <p className="text-gray-600">
                Los mejores lugares para hospedarte en Cuetzalan
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600">
                        -{hotel.discount}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-1">{hotel.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>

                      <div className="mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Precio por noche desde</p>
                          <div className="text-xl font-bold text-primary">
                            MXN ${hotel.price.toLocaleString()}
                          </div>
                          <div className="text-sm line-through text-gray-400">
                            MXN ${hotel.originalPrice.toLocaleString()}
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-4"
                          onClick={() => setLocation(`/hotels/${hotel.id}`)}
                        >
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => setLocation('/hotels')}>
                Ver todos los hoteles
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}