import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

// Mock data for hotels
const hotels = [
  {
    id: 1,
    name: "Hotel Boutique Cuetzalan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
    discount: "20%",
    description: "Hermoso hotel boutique en el corazón de Cuetzalan, con vistas panorámicas y arquitectura colonial.",
    location: "Centro Histórico",
    price: 1899,
    originalPrice: 2375,
    amenities: ["WiFi", "Spa", "Restaurante"]
  },
  {
    id: 2,
    name: "Posada Real Cuetzalan",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1740",
    discount: "15%",
    description: "Tradicional posada con encanto local, jardines exuberantes y ambiente familiar.",
    location: "Barrio de Zacatipan",
    price: 1599,
    originalPrice: 1899,
    amenities: ["Jardín", "Desayuno incluido", "Estacionamiento"]
  },
  {
    id: 3,
    name: "Hotel & Spa Valle Verde",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1740",
    discount: "17%",
    description: "Lujoso hotel con spa, rodeado de naturaleza y perfecta para una escapada relajante.",
    location: "Zona Panorámica",
    price: 2499,
    originalPrice: 2999,
    amenities: ["Spa", "Piscina", "Gimnasio"]
  }
];

export function HotelCards() {
  const [, setLocation] = useLocation();

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">Hoteles en Cuetzalan</h2>
        <p className="text-gray-600">
          Encuentra el alojamiento perfecto para tu estancia en este pueblo mágico.
          Desde hoteles boutique hasta posadas tradicionales con encanto local.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <Badge 
                  variant="destructive" 
                  className="absolute top-4 right-4"
                >
                  Hasta {hotel.discount} de descuento
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {hotel.name}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span>{hotel.location}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {hotel.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="text-xs"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Precio por noche desde</div>
                    <div className="text-xl font-bold text-primary">
                      MXN$ {hotel.price.toLocaleString()}
                    </div>
                    <div className="text-sm line-through text-gray-400">
                      MXN$ {hotel.originalPrice.toLocaleString()}
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      const currentParams = new URLSearchParams(window.location.search);
                      currentParams.set('hotelId', hotel.id.toString());
                      setLocation(`/hotels/${hotel.id}?${currentParams.toString()}`);
                    }}
                    className="w-full"
                  >
                    Más información
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
